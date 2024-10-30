<script setup lang="ts">
import type { EmitPayload } from "~/utils/types";
import type NoteForm from "./note-form.vue";

const search = useNoteSearch();

const trpc = useTrpc();

const { data: notes } = trpc.notes.list.useQuery();

const { mutate: updateNote } = withOptimistic(trpc.notes.update, {
  queries: {
    notes: [trpc.notes.list, undefined],
  },
  onMutate: (store, input) => {
    const note = store.notes.find((note) => note.id === input.id)!;

    Object.assign(note, input);
  },
});

const note = computed(() => {
  return notes.value?.find((note) => note.id === search.note);
});

const isOpen = computed({
  get: () => !!note.value,
  set: (value) => {
    search.note = !value ? undefined : search.note;
  },
});

type SubmitPayload = EmitPayload<typeof NoteForm, "submit">[0];
async function onSubmit(values: SubmitPayload) {
  const id = search.note as number;
  isOpen.value = false;
  await updateNote({
    id,
    ...values,
  });
}
</script>

<template>
  <UiDialog v-model:open="isOpen">
    <UiDialogContent>
      <UiDialogHeader>
        <UiDialogTitle> Update Note </UiDialogTitle>
      </UiDialogHeader>

      <NoteForm id="note-update" @submit="onSubmit" :initial-values="note" />

      <UiDialogFooter>
        <UiDialogClose as-child>
          <UiButton variant="ghost"> Cancel </UiButton>
          <UiButton form="note-update"> Update </UiButton>
        </UiDialogClose>
      </UiDialogFooter>
    </UiDialogContent>
  </UiDialog>
</template>
