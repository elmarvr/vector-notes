<script setup lang="ts">
import type { AvatarFallbackProps as RadixAvatarFallbackProps } from "radix-vue";

export interface AvatarFallbackProps extends RadixAvatarFallbackProps {
  class?: ClassValue;
}

const props = defineProps<AvatarFallbackProps>();

const fallbackProps = reactiveOmit(props, ["class"]);
</script>

<template>
  <RadixAvatarFallback
    :class="cx('flex items-center', props.class)"
    v-bind="fallbackProps"
  >
    <slot />
  </RadixAvatarFallback>
</template>
