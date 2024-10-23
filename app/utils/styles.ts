import { twMerge } from "tailwind-merge";
import { defineConfig } from "cva";

export const { cx, cva, compose } = defineConfig({
  hooks: {
    onComplete: (className) => twMerge(className),
  },
});

export type ClassValue = Parameters<typeof cx>[0];
