<script setup lang="ts">
const id = useId();
const props = defineProps<{
  content: string;
  class?: ClassValue;
}>();

const { data: ast } = await useAsyncData(
  id,
  () => parseMarkdown(props.content),
  {
    watch: [() => props.content],
  }
);
</script>

<template>
  <MDCRenderer
    v-if="ast"
    :body="ast.body"
    :data="ast.data"
    :class="cx('prose prose-invert prose-zinc', props.class)"
  />
</template>
