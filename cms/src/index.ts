import seed from './seed';

export default {
  register() {
    // 可在此注册自定义扩展、钩子或中间件
  },
  bootstrap({ strapi }: { strapi: any }) {
    // 启动时自动执行幂等数据初始化
    if (process.env.ENABLE_STRAPI_SEED === 'true') {
      return seed(strapi);
    }
    return Promise.resolve();
  },
};
