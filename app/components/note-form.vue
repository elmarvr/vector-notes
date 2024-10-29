<script setup lang="ts">
import { z } from "zod";

const noteSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

export interface NoteFormProps {
  id: string;
  initialValues?: Partial<z.infer<typeof noteSchema>>;
}

export interface NoteFormEmits {
  (event: "submit", values: z.infer<typeof noteSchema>): void;
}

const props = defineProps<NoteFormProps>();
const emit = defineEmits<NoteFormEmits>();

const form = useForm({
  schema: z.object({
    title: z.string().min(1),
    content: z.string().min(1),
  }),
  initialValues: props.initialValues,
});

watch(
  () => props.initialValues,
  () => {
    console.log(props.initialValues);
  }
);

const onSubmit = form.handleSubmit((values) => {
  emit("submit", values);
});
</script>

<template>
  <form :id="id" class="space-y-5" @submit="onSubmit">
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
</template>
