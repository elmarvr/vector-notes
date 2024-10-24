<script setup lang="ts">
import { focusRing } from "~/utils/styles";

const props = defineProps<{
  class?: ClassValue;
}>();
</script>

<template>
  <textarea
    :class="
      cx(focusRing(), 'min-h-9 border rounded p-2 bg-transparent', props.class)
    "
  />
</template>
