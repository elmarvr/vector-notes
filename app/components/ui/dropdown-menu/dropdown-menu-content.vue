<script setup lang="ts">
import {
  useForwardPropsEmits,
  type DropdownMenuContentProps as RadixDropdownMenuContentProps,
  type DropdownMenuContentEmits,
} from "radix-vue";

defineOptions({
  inheritAttrs: false,
});

interface DropdownMenuContentProps extends RadixDropdownMenuContentProps {
  class?: ClassValue;
}

const props = withDefaults(defineProps<DropdownMenuContentProps>(), {
  position: "popper",
  sideOffset: 8,
});
const emit = defineEmits<DropdownMenuContentEmits>();

const contentProps = reactiveOmit(props, ["class"]);

const forwarded = useForwardPropsEmits(contentProps, emit);
</script>

<template>
  <RadixDropdownMenuPortal>
    <RadixDropdownMenuContent
      v-bind="{ ...forwarded, ...$attrs }"
      :class="
        cx(
          'bg-background rounded border text-popover-foreground p-1 z-20',
          props.class
        )
      "
    >
      <slot />
    </RadixDropdownMenuContent>
  </RadixDropdownMenuPortal>
</template>
