<script lang="ts" setup>
const state = useFormState();
const meta = useFieldMeta();

const errorMessage = computed(() => {
  return meta.value.errors[0];
});
</script>

<template>
  <p
    v-if="state.submissionAttempts > 0 && errorMessage"
    class="text-red-700 text-sm"
  >
    {{ errorMessage }}
  </p>
</template>
