import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}",
    "./content.config.ts",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        primary: "var(--color-primary)",
        primaryForeground: "var(--color-primary-foreground)",
        card: "var(--color-card)",
        cardForeground: "var(--color-card-foreground)",
        muted: "var(--color-muted)",
        mutedForeground: "var(--color-muted-foreground)",
        input: "var(--color-input)",
        border: "var(--color-border)",
      },
      fontFamily: {
        body: ["Inconsolata", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;
