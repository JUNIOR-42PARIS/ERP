<template>
  <div v-if="memberStore.members">
    <p v-if="memberStore.members.isErr()">Une erreur est survenue...</p>
    <p
      v-else
      v-for="member of memberStore.members.unwrap()"
      :key="member.id_user"
    >
      {{ member.name }}
    </p>
  </div>
  <div v-else>Chargement des membres...</div>
</template>

<script lang="ts" setup>
import { useMemberStore } from "@/stores/member";

const memberStore = useMemberStore();
memberStore.fetchMembers();
</script>
