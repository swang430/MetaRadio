'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';
import clsx from 'clsx';

/**
 * next/image 的容错封装。
 *
 * 当图片加载失败时（最常见：Strapi/图床不可达，导致 /_next/image 优化请求 500），
 * 浏览器默认会显示破图图标或空白。这里改为渲染一个占据相同空间的优雅占位，
 * 让"图片层"也能优雅降级——与数据层回退 Mock 的策略保持一致。
 *
 * 纯客户端处理（onError），不影响 SSR：服务端照常输出 <img>，仅当客户端加载
 * 失败时才切换为占位。
 */
export function SafeImage({ className, fill, alt, ...rest }: ImageProps) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <span
        role="img"
        aria-label={typeof alt === 'string' && alt ? alt : undefined}
        className={clsx(
          className,
          fill && 'absolute inset-0 h-full w-full',
          'flex items-center justify-center bg-gradient-to-br from-slate-500/20 via-slate-400/10 to-slate-300/20',
        )}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
          className="text-slate-400/70"
        >
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="m3 16.5 5-4.5 4 3.5 3-2.5 6 5" />
        </svg>
      </span>
    );
  }

  return (
    <Image
      {...rest}
      fill={fill}
      alt={alt}
      className={className}
      onError={() => setErrored(true)}
    />
  );
}
