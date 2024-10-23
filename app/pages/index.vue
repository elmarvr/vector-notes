<script setup lang="ts">
import * as v from "valibot";

const search = useSearch(
  v.object({
    modal: v.optional(v.string()),
  })
);

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
      <button class="flex items-center gap-2" @click="search.modal = 'new'">
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

    <UiDialog
      :open="!!search.modal"
      @update:open="(open) => !open && (search.modal = undefined)"
    >
      <UiDialogContent> Test </UiDialogContent>
    </UiDialog>
  </div>
</template>
