<script lang="ts" setup>
const { submitCount } = useFormContext();

const isSubmitted = computed(() => submitCount.value > 0);
const { error } = useField();
</script>

<template>
  <p v-if="isSubmitted && error" class="text-red-700 text-sm">
    {{ error }}
  </p>
</template>
