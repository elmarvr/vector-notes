<script setup lang="ts">
import {
  type DialogRootEmits,
  type DialogRootProps as RadixDialogRootProps,
  useForwardPropsEmits,
} from "radix-vue";

export interface DialogRootProps extends RadixDialogRootProps {}

const props = defineProps<DialogRootProps>();
const emits = defineEmits<DialogRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <RadixDialogRoot v-bind="forwarded">
    <slot />
  </RadixDialogRoot>
</template>
