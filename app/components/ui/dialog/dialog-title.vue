<script setup lang="ts">
import {
  DialogTitle,
  type DialogTitleProps as RadixDialogTitleProps,
  useForwardProps,
} from "radix-vue";
import { computed, type HTMLAttributes } from "vue";

export interface DialogTitleProps extends RadixDialogTitleProps {
  class?: ClassValue;
}

const props = defineProps<DialogTitleProps>();

const titleProps = reactiveOmit(props, ["class"]);

const forwardedProps = useForwardProps(titleProps);
</script>

<template>
  <RadixDialogTitle
    v-bind="forwardedProps"
    :class="
      cx('text-lg font-semibold leading-none tracking-tight', props.class)
    "
  >
    <slot />
  </RadixDialogTitle>
</template>
