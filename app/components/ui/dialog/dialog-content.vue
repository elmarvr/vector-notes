<script setup lang="ts">
import type { HTMLAttributes } from "vue";
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

const contentProps = reactiveOmit(props, ["class"]);

const forwarded = useForwardPropsEmits(contentProps, emit);
</script>

<template>
  <RadixDialogPortal>
    <RadixDialogOverlay class="fixed z-50 inset-0 bg-black/80" />
    <RadixDialogContent
      v-bind="forwarded"
      :class="
        cx(
          focusRing(),
          'fixed flex flex-col gap-4 z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background border rounded w-full max-w-xl p-6',
          props.class
        )
      "
    >
      <slot />

      <RadixDialogClose
        :class="
          cx(
            focusRing(),
            'rounded size-6 grid place-items-center absolute top-2 right-2'
          )
        "
      >
        <Icon name="ph:x" />
        <span class="sr-only">Close</span>
      </RadixDialogClose>
    </RadixDialogContent>
  </RadixDialogPortal>
</template>
