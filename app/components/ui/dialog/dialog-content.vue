<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import {
  useForwardPropsEmits,
  type DialogContentEmits,
  type DialogContentProps as RadixDialogContentProps,
} from "radix-vue";
import type { ClassValue } from "~/utils/styles";

export interface DialogContentProps extends RadixDialogContentProps {
  class?: ClassValue;
}

const props = defineProps<
  DialogContentProps & { class?: HTMLAttributes["class"] }
>();
const emit = defineEmits<DialogContentEmits>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emit);
</script>

<template>
  <RadixDialogPortal>
    <RadixDialogOverlay class="fixed z-50 inset-0 bg-black/80" />
    <RadixDialogContent
      v-bind="forwarded"
      :class="
        cx(
          'fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background rounded w-full max-w-xl p-6',
          props.class
        )
      "
    >
      <slot />

      <RadixDialogClose class="">
        <Icon name="ph:x" class="size-4 absolute top-4 right-4" />
        <span class="sr-only">Close</span>
      </RadixDialogClose>
    </RadixDialogContent>
  </RadixDialogPortal>
</template>
