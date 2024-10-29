<script setup lang="ts">
import { z } from "zod";

const trpc = useTrpc();

const { data: notes } = await trpc.notes.list.useQuery();
const { mutate } = trpc.notes.delete.useMutation();

async function deleteNote(id: number) {
  await mutate({ id });

  refresh(trpc.notes.list, undefined);
}
</script>

<template>
  <div class="flex flex-col">
    <ul class="grid grid-cols-3 gap-4">
      <li v-for="note in notes" :key="note.id" class="relative group">
        <NuxtLink
          :to="{
            query: {
              note: note.id,
            },
          }"
          class="block aspect-square border border-card p-4 rounded min-h-16 hover:bg-muted transition"
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

  <NoteUpdateDialog />
</template>
