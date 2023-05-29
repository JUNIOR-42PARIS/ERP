<template>
  <Suspense>
    <div class="container">
      <header>
        <h1>Ressources humaines</h1>
      </header>
      <div class="grid-rh">
        <RessourceHumaineMembreCard @active="() => setMemberActive(member.pseudo)" :active="memberActive === member.pseudo" v-for="member of memberList" :key="member.id_user" :member="member" />
      </div>
    </div>
    <template #fallback> Loading... </template>
  </Suspense>
</template>

<script lang="ts" setup>
import RessourceHumaineMembreCard from '@/components/ressource-humaine/RessourceHumaineMembreCard.vue';
import { useMemberStore, type Member } from '@/stores/member';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const memberStore = useMemberStore();
await memberStore.fetchMembers();

const memberList = computed((): Member[] => {
  return memberStore.memberList;
});

const memberActive = computed((): string => {
  if (typeof route.query.member === "string") {
    return route.query.member;
  }
  return "-";
});

function setMemberActive(pseudo: string | null): void {
  if (!pseudo) {
    return;
  }

  if (memberActive.value === pseudo) {
    router.push({ query: {} });
  } else {
    router.push({
      query: { member: pseudo },
    });
  }
}
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
