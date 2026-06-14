import eslintPluginAstro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist/", ".astro/", ".vercel/", "node_modules/"] },
  // TypeScript files (no type-aware rules to keep linting fast and noise-free)
  {
    files: ["**/*.ts"],
    extends: [tseslint.configs.recommended],
  },
  // Astro components (frontmatter is parsed with @typescript-eslint/parser)
  ...eslintPluginAstro.configs.recommended,
);
