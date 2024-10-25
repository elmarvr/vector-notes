<script setup lang="ts">
import { z } from "zod";

const search = useSearch(
  z.object({
    modal: z.string().optional(),
  })
);
const trpc = useTrpc();

const { mutate: createNote } = trpc.notes.create.useMutation();
const { data: notes } = trpc.notes.list.useQuery();

const form = useForm({
  schema: z.object({
    title: z.string().min(1),
    content: z.string().min(1),
  }),
  onSubmit: async (values) => {
    await createNote(values);

    refresh(trpc.notes.list, undefined);

    isOpen.value = false;
  },
});

const isOpen = computed({
  get: () => search.modal === "create",
  set: (value) => {
    if (!value) {
      search.modal = undefined;
    }
  },
});

watch(isOpen, (open) => {
  if (!open) {
    form.reset();
  }
});
</script>

<template>
  <div>
    <div class="flex justify-between items-center py-3">
      <h1 class="text-xl font-bold">Notes</h1>
      <UiButton size="sm" variant="ghost" as-child>
        <NuxtLink
          :to="{
            query: {
              modal: 'create',
            },
          }"
        >
          <Icon name="ph:plus" />
          Add note
        </NuxtLink>
      </UiButton>
    </div>

    <ul class="columns-3 space-y-4 pt-6">
      <li
        v-for="note in notes"
        :key="note.id"
        class="border border-card p-4 rounded min-h-16"
      >
        {{ note.content }}
      </li>
    </ul>

    <UiDialog v-model="isOpen">
      <UiDialogContent>
        <UiDialogHeader>
          <UiDialogTitle>Create a new note</UiDialogTitle>
        </UiDialogHeader>
        <form id="note-create" class="space-y-5" @submit="form.handleSubmit">
          <form.Field v-slot="{ field }" name="title">
            <div class="space-y-1">
              <UiLabel> Title </UiLabel>
              <UiInput v-bind="field" class="w-full" />
              <FormError />
            </div>
          </form.Field>

          <form.Field v-slot="{ field }" name="content">
            <div class="space-y-1">
              <UiLabel> Content </UiLabel>
              <UiTextarea v-bind="field" class="w-full" />
              <FormError />
            </div>
          </form.Field>
        </form>
        <UiDialogFooter>
          <UiDialogClose as-child>
            <UiButton variant="ghost"> Cancel </UiButton>
            <UiButton form="note-create">Create</UiButton>
          </UiDialogClose>
        </UiDialogFooter>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>
