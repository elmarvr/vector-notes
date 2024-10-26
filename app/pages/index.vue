<script setup lang="ts">
import { z } from "zod";

const { user } = useUserSession();

const noteId = useRouteQuery("note", undefined, {
  transform: (value) => {
    return z
      .union([z.literal("create"), z.coerce.number()])
      .optional()
      .parse(value);
  },
});

const trpc = useTrpc();

const { data: notes } = await trpc.notes.list.useQuery();
const { mutate } = trpc.notes.delete.useMutation();

async function deleteNote(id: number) {
  await mutate({ id });

  refresh(trpc.notes.list, undefined);
}

const note = computed(() => {
  return notes.value?.find((note) => note.id === noteId.value);
});
</script>

<template>
  <div class="flex flex-col">
    <div class="flex justify-between items-center py-3">
      <h1 class="text-xl font-bold">{{ user?.name }}'s notes</h1>
      <UiButton size="sm" variant="ghost" as-child>
        <NuxtLink
          :to="{
            query: {
              note: 'create',
            },
          }"
        >
          <Icon name="ph:plus" />
          Add note
        </NuxtLink>
      </UiButton>
    </div>

    <ul class="columns-3 pt-6 flex-1">
      <li v-for="note in notes" :key="note.id" class="relative group">
        <NuxtLink
          :to="{
            query: {
              note: note.id,
            },
          }"
          class="block border border-card p-4 rounded min-h-16 hover:bg-muted transition"
        >
          {{ note.content }}
        </NuxtLink>
        <button
          class="absolute top-2 right-2 z-20 group-hover:block hidden"
          @click.stop="deleteNote(note.id)"
        >
          <Icon name="ph:trash" class="size-3.5" />
        </button>
      </li>
    </ul>
  </div>

  <NoteCreateDialog
    :open="noteId === 'create'"
    @close="
      () => {
        noteId = undefined;
      }
    "
  />

  <NoteUpdateDialog
    :note="note"
    @close="
      () => {
        noteId = undefined;
      }
    "
  />
</template>
