<script setup lang="ts">
const props = defineProps<{
  class?: ClassValue;
}>();
</script>

<template>
  <label :class="cx('text-sm block font-semibold', props.class)">
    <slot />
  </label>
</template>
