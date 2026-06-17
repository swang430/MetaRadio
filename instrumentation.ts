/**
 * Next.js instrumentation hook (runs once at server startup).
 *
 * 目的：让"数据源不可达"成为可降级的瞬时故障，而不是整页 500。
 *
 * 背景：lib/strapi.ts 的 api() 用 `next: { revalidate }` 走 Next 的 fetch 缓存。
 * 当缓存条目过期(stale)且 Strapi 此时不可达时，Next 会在**后台**重新发起这次
 * fetch 做 ISR 重验证。这个后台 fetch 由 Next 内部发出，**不经过 api() 的
 * try/catch**，一旦 ECONNREFUSED 就变成 unhandledRejection，进而冲垮当前请求的
 * 渲染流（"failed to pipe response" → 500，甚至无限挂起）。
 *
 * 这里安装一个进程级守卫：仅吞掉这类瞬时网络 fetch 异常（让本次渲染用陈旧缓存/
 * mock 数据正常完成），其它未处理 rejection 照常大声报错，避免掩盖真实 bug。
 */
export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return;

  process.on('unhandledRejection', (reason: unknown) => {
    const err = reason as { message?: string; cause?: { code?: string } } | undefined;
    const message = err?.message ?? String(reason);
    const code = err?.cause?.code;

    const isTransientFetchError =
      message.includes('fetch failed') ||
      code === 'ECONNREFUSED' ||
      code === 'ECONNRESET' ||
      code === 'ETIMEDOUT' ||
      code === 'ENOTFOUND' ||
      code === 'EAI_AGAIN' ||
      code === 'UND_ERR_CONNECT_TIMEOUT';

    if (isTransientFetchError) {
      console.warn(
        `[instrumentation] 已吞掉数据源不可达导致的后台 fetch 异常（${code || message}）；` +
          `本次渲染将回退到缓存/Mock 内容，而不是崩溃。`,
      );
      return;
    }

    // 非网络类的未处理 rejection：保持可见，不掩盖真实问题。
    console.error('[instrumentation] Unhandled rejection:', reason);
  });
}
