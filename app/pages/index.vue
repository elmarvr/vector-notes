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
  <div>
    <div class="flex justify-between items-center py-3">
      <h1 class="text-xl font-bold">Notes</h1>

      <button class="flex items-center gap-2">
        <Icon name="ph:plus" />
        Add note
      </button>
    </div>
    <div class="grid grid-cols-3">
      <div v-for="note of data.notes" :key="note.id">
        <div class="bg-card p-4 rounded">
          <p>
            {{ note.content }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
