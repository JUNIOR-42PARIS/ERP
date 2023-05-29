<template>
  <Suspense>
    <div class="container">
      <header>
        <h1>Missions</h1>
      </header>
      <div class="grid-rh">
        <RessourceHumaineMembreCard
          v-for="member of memberList"
          :key="member.id_user"
          :member="member"
        />
      </div>
    </div>
    <template #fallback> Loading... </template>
  </Suspense>
</template>

<script lang="ts" setup>
import RessourceHumaineMembreCard from '@/components/ressource-humaine/RessourceHumaineMembreCard.vue';
import { useMemberStore, type Member } from '@/stores/member';
import { computed } from 'vue';

const memberStore = useMemberStore();
await memberStore.fetchMembers();

const memberList = computed((): Member[] => {
  return memberStore.memberList;
});
</script>

<style lang="scss" scoped>
@import '@/assets/views.scss';

.grid-rh {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 16px;
}
</style>
