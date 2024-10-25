<script setup lang="ts">
import { z } from "zod";

const noteSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

export interface NoteFormProps {
  id: string;
  defaultValues?: Partial<z.infer<typeof noteSchema>>;
}

const props = defineProps<NoteFormProps>();
const emit = defineEmits<{
  (event: "submit", values: z.infer<typeof noteSchema>): void;
}>();

const form = useForm({
  schema: z.object({
    title: z.string().min(1),
    content: z.string().min(1),
  }),
  defaultValues: props.defaultValues,
  onSubmit: (values) => {
    emit("submit", values);
  },
});

watch(
  () => props.defaultValues,
  (defaultValues) => {
    if (!defaultValues) {
      return;
    }

    form.getFieldInfo("title").instance?.setValue(defaultValues.title);
  },
  {
    immediate: true,
    deep: true,
  }
);
</script>

<template>
  <form :id="id" class="space-y-5" @submit="form.handleSubmit">
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
