<script setup lang="ts">
import type { EmitPayload } from "~/utils/types";
import type NoteForm from "./note-form.vue";

type SubmitPayload = EmitPayload<typeof NoteForm, "submit">[0];

defineProps<{
  open: boolean;
}>();

const emit = defineEmits<{
  (event: "close"): void;
}>();

const trpc = useTrpc();

const { mutate: createNote } = trpc.notes.create.useMutation();

function onSubmit(values: SubmitPayload) {
  console.log(values);
  createNote(values);

  refresh(trpc.notes.list, undefined);
  emit("close");
}
</script>

<template>
  <UiDialog :open="open" @update:open="(open) => !open && emit('close')">
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
