<script setup lang="ts">
import type { AvatarImageProps } from "radix-vue";

const props = defineProps<AvatarImageProps>();
</script>

<template>
  <RadixAvatarImage v-bind="props" class="h-full w-full object-cover" />
</template>
