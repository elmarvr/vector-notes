<script setup lang="ts">
import type { EmitPayload } from "~/utils/types";
import type NoteForm from "./note-form.vue";

const search = useNoteSearch();

const trpc = useTrpc();

const { data: notes } = trpc.notes.list.useQuery();
const { mutate: updateNote } = trpc.notes.update.useMutation();

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
function onSubmit(values: SubmitPayload) {
  updateNote({
    id: search.note as number,
    ...values,
  });

  refresh(trpc.notes.list, undefined);

  isOpen.value = false;
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
