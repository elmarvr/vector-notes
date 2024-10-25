<script setup lang="ts">
const props = defineProps<{
  open: boolean;
}>();

const emit = defineEmits<{
  (event: "close"): void;
}>();

const trpc = useTrpc();

const { mutate: createNote } = trpc.notes.create.useMutation();

function onSubmit(values: any) {
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
