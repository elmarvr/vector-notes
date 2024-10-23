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
  <main class="w-full max-w-xl mx-auto">
    <div class="grid grid-cols-3">
      <div v-for="note of data.notes" :key="note.id">
        <div class="bg-white shadow-md p-4 rounded-lg">
          <h2 class="text-xl font-semibold">
            {{ note.title }}
          </h2>
          <p class="text-gray-600">
            {{ note.content }}
          </p>
        </div>
      </div>
    </div>
  </main>
</template>
