<script setup lang="ts">
import { type DropdownMenuTriggerProps, useForwardProps } from "radix-vue";

const props = defineProps<DropdownMenuTriggerProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <RadixDropdownMenuTrigger
    class="outline-none cursor-pointer"
    v-bind="forwardedProps"
  >
    <slot />
  </RadixDropdownMenuTrigger>
</template>
