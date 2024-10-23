<script setup lang="ts">
import type { DialogTriggerProps as RadixDialogTriggerProps } from "radix-vue";

export interface DialogTriggerProps extends RadixDialogTriggerProps {}

const props = defineProps<DialogTriggerProps>();
</script>

<template>
  <RadixDialogTrigger v-bind="props">
    <slot />
  </RadixDialogTrigger>
</template>
