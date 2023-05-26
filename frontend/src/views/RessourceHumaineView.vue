<template>
  <Suspense>
    <div v-for="member of memberList" class="container grid-rh" :key="member.id_user">
      <RessourceHumaineMembreCard :member="member" />
    </div>
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>

<script lang="ts" setup>
import RessourceHumaineMembreCard from '@/components/ressource-humaine/RessourceHumaineMembreCard.vue';
import { useMemberStore } from "@/stores/member";

const memberStore = useMemberStore();
const memberList = await memberStore.fetchMembers();
</script>

<style lang="scss" scoped>
.grid-rh {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-start;
}
</style>