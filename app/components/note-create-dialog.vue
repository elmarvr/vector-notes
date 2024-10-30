<script setup lang="ts">
import type { EmitPayload } from "~/utils/types";
import type NoteForm from "./note-form.vue";

const search = useNoteSearch();
const trpc = useTrpc();

const { user } = useUserSession();

const { mutate: createNote } = withOptimistic(trpc.notes.create, {
  queries: {
    notes: [trpc.notes.list, undefined],
  },
  onMutate: (store, input) => {
    store.notes.push({
      ...input,
      id: new Date().getTime(),
      userId: user.value?.id!,
      updatedAt: new Date(),
      createdAt: new Date(),
    });
  },
});

const isOpen = computed({
  get: () => search.note === "create",
  set: (value) => {
    search.note = value ? "create" : undefined;
  },
});

type SubmitPayload = EmitPayload<typeof NoteForm, "submit">[0];
async function onSubmit(values: SubmitPayload) {
  isOpen.value = false;
  await createNote(values);
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
