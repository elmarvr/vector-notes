<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});

const trpc = useTrpc();

const { data: notes } = await trpc.notes.list.useQuery();
const { mutate } = trpc.notes.delete.useMutation();

async function deleteNote(id: number) {
  await mutate({ id });

  refresh(trpc.notes.list, undefined);
}
</script>

<template>
  <ul class="grid grid-cols-3 gap-4">
    <li v-for="note in notes" :key="note.id" class="relative group">
      <NuxtLink
        :to="{
          query: {
            note: note.id,
          },
        }"
        class="flex flex-col aspect-square border border-card p-3 rounded min-h-16 hover:bg-muted transition"
      >
        <h3 class="text-lg font-semibold pb-1">
          {{ note.title }}
        </h3>

        <p class="line-clamp-6">
          {{ note.content }}
        </p>

        <div class="flex-1" />

        <p class="text-sm text-muted-foreground">
          Last updated at <NuxtTime :datetime="note.updatedAt" />
        </p>
      </NuxtLink>

      <button
        class="absolute top-3 right-3 z-20 group-hover:block hidden"
        @click.stop="deleteNote(note.id)"
      >
        <Icon name="ph:trash" class="size-3.5" />
      </button>
    </li>
  </ul>

  <NoteUpdateDialog />
</template>
