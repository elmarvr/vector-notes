<script setup lang="ts">
const store = useMessageStore();
</script>

<template>
  <div>
    <p v-for="message in store.messages" :key="message.content">
      {{ message.role }}: {{ message.content }}
    </p>
  </div>
</template>
