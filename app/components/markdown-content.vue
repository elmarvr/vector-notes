<script setup lang="ts">
const props = defineProps<{
  id: string;
  content: string;
  class?: ClassValue;
}>();

const { data: ast } = await useAsyncData(
  props.id,
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
