<script setup lang="ts">
import { z } from "zod";
const router = useRouter();

const route = useRoute();

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

const { user } = useUserSession();
</script>

<template>
  <Body>
    <div class="flex flex-col h-full">
      <header class="py-3">
        <div class="max-w-3xl mx-auto flex justify-between items-center">
          <h1 class="text-xl font-bold">Vector notes</h1>

          <div class="flex gap-3 items-center">
            <UiButton
              v-if="route.name === 'index'"
              size="sm"
              variant="ghost"
              as-child
            >
              <NuxtLink
                :to="{
                  query: {
                    note: 'create',
                  },
                }"
              >
                <Icon name="ph:plus" class="text-primary" />
                Add note
              </NuxtLink>
            </UiButton>
            <UiButton v-else as-child variant="ghost" size="sm">
              <NuxtLink to="/">
                <Icon name="ph:caret-left" class="text-primary" />
                Notes
              </NuxtLink>
            </UiButton>

            <UiButton
              v-if="user?.role === 'guest'"
              size="sm"
              variant="ghost"
              as-child
            >
              <a href="/auth/github">
                <Icon name="ph:github-logo" />
                Sign in
              </a>
            </UiButton>
            <UserAvatar v-else :user="user!" />
          </div>
        </div>
      </header>

      <main class="flex-1 min-h-0">
        <slot />
      </main>

      <div class="w-full py-6">
        <form class="max-w-3xl mx-auto flex gap-2" @submit="onSubmit">
          <form.Field name="content" v-slot="{ field }">
            <UiInput
              v-bind="field"
              class="flex-1"
              placeholder="Ask a question about your notes"
            />
          </form.Field>

          <UiButton size="icon">
            <Icon name="ph:paper-plane" class="rotate-45" />
          </UiButton>
        </form>
      </div>
    </div>

    <NoteCreateDialog />
  </Body>
</template>
