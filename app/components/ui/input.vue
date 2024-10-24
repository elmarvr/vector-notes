<script setup lang="ts">
import { focusRing } from "~/utils/styles";

const props = defineProps<{
  class?: ClassValue;
}>();
</script>

<template>
  <input
    :class="
      cx(focusRing(), 'h-9 border rounded px-2 bg-transparent', props.class)
    "
  />
</template>
