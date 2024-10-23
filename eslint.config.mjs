// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  rules: {
    "@stylistic/quotes": ["error", "double"],
    "@stylistic/semi": ["error", "always"],
  },
}).overrideRules({
  "vue/max-attributes-per-line": ["warn", { singleline: 3 }],
});
