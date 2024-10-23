<script setup lang="ts">
const { data } = await useSuperjson("/api/notes", {
  default: () => {
    return {
      notes: [],
    };
  },
});
</script>

<template>
  <div class="grid grid-cols-3">
    <div v-for="note of data.notes" :key="note.id">
      <div class="bg-card p-4 rounded">
        <p>
          {{ note.content }}
        </p>
      </div>
    </div>
  </div>
</template>
