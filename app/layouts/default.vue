<script setup lang="ts">
import { z } from "zod";

const router = useRouter();
const { send } = useMessageStore();

const form = useForm({
  schema: z.object({
    content: z.string(),
  }),
});

const onSubmit = form.handleSubmit(({ content }, ctx) => {
  ctx.resetForm();
  router.push("/chat");
  send(content);
});
</script>

<template>
  <Body>
    <div class="flex flex-col h-full">
      <div class="flex-1 min-h-0 overflow-y-auto">
        <main class="max-w-3xl mx-auto h-full">
          <slot />
        </main>
      </div>

      <div class="w-full p-4">
        <form class="max-w-3xl mx-auto flex gap-4" @submit="onSubmit">
          <form.Field name="content" v-slot="{ field }">
            <UiInput v-bind="field" class="flex-1" />
          </form.Field>

          <UiButton type="submit">Send</UiButton>
        </form>
      </div>
    </div>
  </Body>
</template>
