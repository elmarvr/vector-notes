<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});

const containerRef = useTemplateRef("container");

useAutoScroll(containerRef);

const store = useMessageStore();
</script>

<template>
  <div ref="container" class="h-full overflow-y-auto">
    <div class="mx-auto max-w-3xl w-full pt-6">
      <ul class="w-full flex flex-col gap-5">
        <template v-for="(message, index) in store.messages" :key="index">
          <li
            v-if="message.role === 'user'"
            class="inline-flex bg-muted px-3 py-2 rounded self-end"
          >
            <p>{{ message.content }}</p>
          </li>

          <li v-else class="py-2">
            <MarkdownContent :content="message.content" />
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>
