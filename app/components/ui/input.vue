<script setup lang="ts">
const props = defineProps<{
  class?: ClassValue;
}>();
</script>

<template>
  <input
    :class="cx('h-9 border border rounded px-2 bg-transparent', props.class)"
  />
</template>
