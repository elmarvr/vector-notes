<script setup lang="ts">
import {
  type DropdownMenuItemProps as RadixDropdownMenuItemProps,
  useForwardProps,
} from "radix-vue";

export interface DropdownMenuItemProps extends RadixDropdownMenuItemProps {
  class?: ClassValue;
}

const props = defineProps<DropdownMenuItemProps>();

const itemProps = reactiveOmit(props, ["class"]);
const forwardedProps = useForwardProps(itemProps);
</script>

<template>
  <RadixDropdownMenuItem
    v-bind="forwardedProps"
    :class="
      cx(
        'flex items-center text-sm px-2 py-1 relative transition-colors rounded outline-none focus:bg-muted',
        props.class
      )
    "
  >
    <slot />
  </RadixDropdownMenuItem>
</template>
