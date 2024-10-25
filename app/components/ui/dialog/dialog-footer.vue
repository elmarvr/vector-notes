<script setup lang="ts">
export interface DialogFooterProps {
  class?: ClassValue;
}

const props = defineProps<DialogFooterProps>();
</script>

<template>
  <div
    :class="
      cx(
        'flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-x-2',
        props.class
      )
    "
  >
    <slot />
  </div>
</template>
