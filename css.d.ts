// 全局 CSS 副作用导入（如 app/layout.tsx 的 `import './globals.css'`）的环境声明。
// 必需，因为 tsconfig 启用了 noUncheckedSideEffectImports，会校验副作用导入能否解析。
// 注意：CSS Modules（*.module.css）仍由 Next 自带的更具体声明处理，不受影响。
declare module '*.css';
