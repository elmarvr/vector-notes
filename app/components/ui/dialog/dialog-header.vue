<script setup lang="ts">
const props = defineProps<{
  class?: ClassValue;
}>();
</script>

<template>
  <div
    :class="cx('flex flex-col gap-y-1.5 text-center sm:text-left', props.class)"
  >
    <slot />
  </div>
</template>
