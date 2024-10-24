<script setup lang="ts">
const props = defineProps<{
  class?: ClassValue;
}>();
</script>

<template>
  <textarea
    :class="cx('min-h-9 border rounded p-2 bg-transparent', props.class)"
  />
</template>
