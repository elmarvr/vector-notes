<script setup lang="ts">
const store = useMessageStore();
</script>

<template>
  <div class="w-full flex flex-col gap-5">
    <template v-for="(message, index) in store.messages" :key="index">
      <div
        v-if="message.role === 'user'"
        class="inline-flex bg-muted px-3 py-2 rounded self-end"
      >
        <p>{{ message.content }}</p>
      </div>
      <div v-else class="py-2">
        <p>
          {{ message.content }}
        </p>
      </div>
    </template>
  </div>
</template>
