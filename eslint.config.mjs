import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      // metaradio-cms 是独立 Strapi 项目（CommonJS 脚本/生成类型），有自己的规范，
      // 不应被前端 ESLint 扫描（与 tsconfig 的 exclude 保持一致）
      "metaradio-cms/**",
      // 旧版 legacy Strapi 遗留目录 + 任意编译产物，不参与前端 lint
      "cms/**",
      "**/dist/**",
    ],
  },
  {
    rules: {
      // Strapi 富文本/动态内容天然是动态结构，允许 any（降为警告，不阻断构建）
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
];

export default eslintConfig;
