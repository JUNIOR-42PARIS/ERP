<template>
  <Suspense>
    <div class="container grid-rh">
      <RessourceHumaineMembreCard v-for="member of memberList" :key="member.id_user" :member="member" />
    </div>
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>

<script lang="ts" setup>
import RessourceHumaineMembreCard from '@/components/ressource-humaine/RessourceHumaineMembreCard.vue';
import { useMemberStore, type Member } from "@/stores/member";
import { computed } from 'vue';

const memberStore = useMemberStore();
await memberStore.fetchMembers();

const memberList = computed((): Member[] => {
  return memberStore.members;
});
</script>

<style lang="scss" scoped>
.grid-rh {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 16px;
}
</style>