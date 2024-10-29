<script setup lang="ts">
import type { EmitPayload } from "~/utils/types";
import type NoteForm from "./note-form.vue";
import { z } from "zod";

const search = useNoteSearch();
const trpc = useTrpc();

const { mutate: createNote } = trpc.notes.create.useMutation();

const isOpen = computed({
  get: () => search.note === "create",
  set: (value) => {
    search.note = value ? "create" : undefined;
  },
});

type SubmitPayload = EmitPayload<typeof NoteForm, "submit">[0];
function onSubmit(values: SubmitPayload) {
  createNote(values);
  refresh(trpc.notes.list, undefined);
  isOpen.value = false;
}
</script>

<template>
  <UiDialog v-model:open="isOpen">
    <UiDialogContent>
      <UiDialogHeader>
        <UiDialogTitle> Create Note </UiDialogTitle>
      </UiDialogHeader>

      <NoteForm id="note-create" @submit="onSubmit" />

      <UiDialogFooter>
        <UiDialogClose as-child>
          <UiButton variant="ghost"> Cancel </UiButton>
          <UiButton form="note-create"> Create </UiButton>
        </UiDialogClose>
      </UiDialogFooter>
    </UiDialogContent>
  </UiDialog>
</template>
