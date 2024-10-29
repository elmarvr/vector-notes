<script setup lang="ts">
import type { PrimitiveProps } from "radix-vue";
import type { VariantProps } from "cva";
import { focusRing } from "~/utils/styles";

const buttonVariants = compose(
  focusRing,
  cva({
    base: "text-foreground gap-2 inline-flex items-center justify-center rounded text-sm transition-colors duration-200 disabled:opacity-50",
    variants: {
      variant: {
        default: "bg-primary text-foreground hover:bg-primary/90",
        ghost: "hover:bg-muted font-normal",
      },
      size: {
        sm: "h-8 px-2",
        default: "h-9 px-3 py-2",
        icon: "size-9 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  })
);

type ButtonVariants = VariantProps<typeof buttonVariants>;

export interface ButtonProps extends PrimitiveProps {
  variant?: ButtonVariants["variant"];
  size?: ButtonVariants["size"];
  class?: ClassValue;
}

const props = withDefaults(defineProps<ButtonProps>(), {
  as: "button",
});
</script>

<template>
  <RadixPrimitive
    :as="as"
    :as-child="asChild"
    :class="
      buttonVariants({
        variant,
        size,
        class: props.class,
      })
    "
  >
    <slot />
  </RadixPrimitive>
</template>
