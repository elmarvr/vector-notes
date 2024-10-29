<script setup lang="ts">
import { focusRing } from "~/utils/styles";

const { textarea, input } = useTextareaAutosize({
  styleProp: "minHeight",
});

const props = defineProps<{
  class?: ClassValue;
  modelValue?: string;
}>();

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
}>();

const value = useVModel(props, "modelValue", emit);

syncRef(
  computed(() => value.value ?? ""),
  input,
  {
    direction: "ltr",
  }
);
</script>

<template>
  <textarea
    ref="textarea"
    v-model="value"
    :rows="3"
    :class="
      cx(
        focusRing(),
        'resize-none border rounded p-2 bg-transparent min-h-9',
        props.class
      )
    "
  />
</template>

<style lang="css" scoped>
textarea {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

textarea::-webkit-scrollbar {
  display: none;
}
</style>
