<script setup lang="ts">
import { z } from "zod";

const search = useSearch(
  z.object({
    modal: z.optional(z.string()),
  })
);

const { data } = await useSuperjson("/api/notes", {
  default: () => {
    return {
      notes: [],
    };
  },
});

const [form, { Field }] = useForm(
  z.object({
    title: z.string().min(3),
    content: z.string().min(3),
  })
);

const onSubmit = form.handleSubmit(async (values) => {
  console.log(values);
});
</script>

<template>
  <div>
    <div class="flex justify-between items-center py-3">
      <h1 class="text-xl font-bold">Notes</h1>
      <button class="flex items-center gap-2" @click="search.modal = 'new'">
        <Icon name="ph:plus" />
        Add note
      </button>
    </div>
    <div class="grid grid-cols-3">
      <div v-for="note of data.notes" :key="note.id">
        <div class="bg-card p-4 rounded">
          <p>
            {{ note.content }}
          </p>
        </div>
      </div>
    </div>

    <UiDialog
      :open="!!search.modal"
      @update:open="(open) => !open && (search.modal = undefined)"
    >
      <UiDialogContent>
        <form class="space-y-5" @submit="onSubmit">
          <Field v-slot="{ field }" name="title">
            <div class="space-y-2">
              <UiLabel> Title </UiLabel>
              <UiInput v-bind="field" class="w-full" />
              <FormError />
            </div>
          </Field>
          <Field v-slot="{ field }" name="content">
            <div class="space-y-2">
              <UiLabel> Content </UiLabel>
              <UiTextarea v-bind="field" class="w-full" />
              <FormError />
            </div>
          </Field>

          <UiDialogFooter>
            <UiDialogClose>
              <UiButton variant="ghost"> Cancel </UiButton>
            </UiDialogClose>
            <UiButton>Create</UiButton>
          </UiDialogFooter>
        </form>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>
