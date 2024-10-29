<script setup lang="ts">
import type { EmitPayload } from "~/utils/types";
import type { Note } from "~~/server/utils/drizzle";
import type NoteForm from "./note-form.vue";

type SubmitPayload = EmitPayload<typeof NoteForm, "submit">[0];

const props = defineProps<{
  note: Note | undefined;
}>();

const emit = defineEmits<{
  (event: "close"): void;
}>();

const trpc = useTrpc();

const { mutate: updateNote } = trpc.notes.update.useMutation();

function onSubmit(values: SubmitPayload) {
  updateNote({
    id: props.note!.id,
    ...values,
  });

  refresh(trpc.notes.list, undefined);

  emit("close");
}
</script>

<template>
  <UiDialog :open="!!note" @update:open="(open) => !open && emit('close')">
    <UiDialogContent>
      <UiDialogHeader>
        <UiDialogTitle> Update Note </UiDialogTitle>
      </UiDialogHeader>

      <NoteForm id="note-update" @submit="onSubmit" :default-values="note" />

      <UiDialogFooter>
        <UiDialogClose as-child>
          <UiButton variant="ghost"> Cancel </UiButton>
          <UiButton form="note-update"> Update </UiButton>
        </UiDialogClose>
      </UiDialogFooter>
    </UiDialogContent>
  </UiDialog>
</template>
