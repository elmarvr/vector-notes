<script lang="ts" setup>
import { ErrorMessage } from "vee-validate";

const { name } = useField();
</script>

<template>
  <ErrorMessage as="p" :name="name" class="text-sm font-medium text-red-700" />
</template>
