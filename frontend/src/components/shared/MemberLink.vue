<template>
  <RouterLink class="resource-link" :to="{ name: 'ressources-humaines', query: { member: props.member.pseudo } }">@{{ props.member.pseudo }}</RouterLink>
</template>

<script lang="ts" setup>
import type { Member } from '@/stores/member';

const props = defineProps<{
  member: Member;
}>();
</script>

