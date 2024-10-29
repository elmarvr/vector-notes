<script setup lang="ts">
import type { User } from "#auth-utils";

const route = useRoute();

defineProps<{
  user: User;
}>();
</script>

<template>
  <UiAvatar as-child class="hover:bg-muted">
    <a href="/auth/sign-out">
      <UiAvatarImage v-if="user.avatar" :src="user.avatar" />
      <UiAvatarFallback>
        <Icon name="ph:user" />
      </UiAvatarFallback>
    </a>
  </UiAvatar>
</template>
