// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  rules: {
    "@stylistic/quotes": ["error", "double"],
    "@stylistic/semi": ["error", "always"],
    "@stylistic/arrow-parens": ["error", "always"],
    "@stylistic/comma-dangle": ["error", "only-multiline"],
    "@typescript-eslint/no-empty-object-type": ["off"],
    "@typescript-eslint/no-explicit-any": ["off"],
    "vue/singleline-html-element-content-newline": ["off"],
    "vue/comma-dangle": ["error", "only-multiline"],
    "vue/html-self-closing": ["off"],
    "@stylistic/member-delimiter-style": [
      "error",
      { multiline: { delimiter: "semi" } },
    ],
  },
}).overrideRules({
  "vue/max-attributes-per-line": ["warn", { singleline: 3 }],
});
