// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  rules: {
    "@stylistic/quotes": ["error", "double"],
    "@stylistic/semi": ["error", "always"],
    "@stylistic/arrow-parens": ["error", "always"],
    "@stylistic/comma-dangle": ["error", "only-multiline"],
    "@typescript-eslint/no-explicit-any": ["off"],
    "vue/singleline-html-element-content-newline": ["off"],
  },
}).overrideRules({
  "vue/max-attributes-per-line": ["warn", { singleline: 3 }],
});
