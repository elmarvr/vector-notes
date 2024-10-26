<script setup lang="ts">
import { z } from "zod";

const router = useRouter();
const { send } = useMessageStore();

const form = useForm({
  schema: z.object({
    content: z.string(),
  }),
  async onSubmit({ content }) {
    router.push("/chat");
    send(content);
  },
});
</script>

<template>
  <Body>
    <div>
      <main class="w-full max-w-3xl mx-auto">
        <slot />
      </main>

      <div class="w-full fixed bottom-0 p-4">
        <form class="max-w-3xl mx-auto flex gap-4" @submit="form.handleSubmit">
          <form.Field name="content" v-slot="{ field }">
            <UiInput v-bind="field" class="flex-1" />
          </form.Field>

          <UiButton type="submit">Send</UiButton>
        </form>
      </div>
    </div>
  </Body>
</template>
