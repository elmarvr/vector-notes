<script setup lang="ts">
import type { AvatarRootProps as RadixAvatarRootProps } from "radix-vue";

export interface AvatarRootProps extends RadixAvatarRootProps {
  class?: ClassValue;
}

const props = withDefaults(defineProps<AvatarRootProps>(), { as: "div" });

const rootProps = reactiveOmit(props, ["class"]);
</script>

<template>
  <RadixAvatarRoot
    :class="
      cx(
        'inline-flex size-9 items-center justify-center select-none shrink-0 border overflow-hidden rounded-full',
        props.class
      )
    "
    v-bind="rootProps"
  >
    <slot />
  </RadixAvatarRoot>
</template>
