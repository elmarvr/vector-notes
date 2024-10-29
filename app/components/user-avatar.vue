<script setup lang="ts">
import type { User } from "#auth-utils";

defineProps<{
  user: User;
}>();
</script>

<template>
  <UiDropdownMenu>
    <UiDropdownMenuTrigger as-child>
      <UiAvatar class="hover:bg-muted" as-child>
        <button :class="focusRing()">
          <UiAvatarImage v-if="user.avatar" :src="user.avatar" />
          <UiAvatarFallback>
            <Icon name="ph:user" />
          </UiAvatarFallback>
        </button>
      </UiAvatar>
    </UiDropdownMenuTrigger>
    <UiDropdownMenuContent align="end">
      <UiDropdownMenuItem as-child>
        <a href="/auth/sign-out">
          <Icon name="ph:sign-out" class="mr-2" />
          Sign out
        </a>
      </UiDropdownMenuItem>
    </UiDropdownMenuContent>
  </UiDropdownMenu>
</template>
