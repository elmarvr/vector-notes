<script setup lang="ts">
import { type DialogCloseProps as RadixDialogCloseProps } from "radix-vue";

export interface DialogCloseProps extends RadixDialogCloseProps {}

const props = defineProps<DialogCloseProps>();
</script>

<template>
  <RadixDialogClose v-bind="props">
    <slot />
  </RadixDialogClose>
</template>
