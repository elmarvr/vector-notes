<script setup lang="ts">
import { z } from "zod";
import { useForm } from "~/composables/use-form";

const search = useSearch(
  z.object({
    modal: z.optional(z.string()),
  })
);

const { data } = await useSuperjson("/api/notes", {
  default: () => {
    return {
      notes: [],
    };
  },
});

const form = useForm(
  z.object({
    content: z.string(),
  })
);
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
      <UiDialogContent>
        <form.Field v-slot="{ field }" name="content">
          <input v-bind="field" />

          <pre>
            {{ JSON.stringify(form.values, null, 2) }}
          </pre>
        </form.Field>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>
