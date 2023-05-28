<template>
  <Suspense>
    <div v-if="mission">
      <header>
        <div id="header-details">
          <h1>{{ mission.nom }}</h1>
          <div id="header-details-subtitle">
            Chef de projet

            <template v-if="!isEditingCdp">
              <RouterLink v-if="cdp !== null" to="/membre/user1" class="resource-link">{{
                cdp.name
              }}</RouterLink>
              <span class="no-cdp" v-else>Aucun</span>

              <font-awesome-icon :icon="['far', 'pen-to-square']" @click="toggleEditionCdp" />
            </template>
            <template v-else>
              <Multiselect
                :options="memberList"
                label="name"
                track-by="id_user"
                v-model="idNewCDP"
                width="100px"
                @close="editCdp"
              />
            </template>
          </div>
        </div>
        <button class="btn">+ Ajouter un BC</button>
      </header>
      <nav>
        <RouterLink :to="`/missions/${mission.nom}/`" exact-active-class="active"
          >Résumé</RouterLink
        >
        <RouterLink :to="`/missions/${mission.nom}/phases`" exact-active-class="active"
          >Phases</RouterLink
        >
        <RouterLink :to="`/missions/${mission.nom}/documents`" exact-active-class="active"
          >Documents</RouterLink
        >
        <RouterLink :to="`/missions/${mission.nom}/membres`" exact-active-class="active"
          >Membres</RouterLink
        >
        <RouterLink :to="`/missions/${mission.nom}/calendrier`" exact-active-class="active"
          >Calendrier</RouterLink
        >
      </nav>

      <div class="container" v-if="mission">
        <RouterView :mission="mission" />
      </div>
    </div>
    <template #fallback> Loading... </template>
  </Suspense>
</template>

<script lang="ts" setup>
import { useMemberStore, type Member } from '@/stores/member';
import { useMissionStore, IntervenantType } from '@/stores/mission';
import { computed, ref } from 'vue';
import Multiselect from 'vue-multiselect';

const missionStore = useMissionStore();
const memberStore = useMemberStore();

await missionStore.fetchMissionFromUrl();

const isEditingCdp = ref<boolean>(false);
const idNewCDP = ref<Member | null>(null);

const mission = computed(() => {
  return missionStore.mission;
});

const memberList = computed((): Member[] => {
  return memberStore.memberList;
});

const cdp = computed(() => {
  if (!mission.value) return null;
  const cdpList = mission.value.members_type.filter(
    (member) => member.type === IntervenantType.CDP
  );
  if (cdpList.length === 0) return null;
  return cdpList[0].member;
});

async function toggleEditionCdp() {
  await memberStore.fetchMemberCdpOrAdminList();

  if (cdp.value) {
    idNewCDP.value = cdp.value;
  }

  isEditingCdp.value = !isEditingCdp.value;
}

async function editCdp() {
  if (mission.value) {
    try {
      await missionStore.editCdpForMission(
        mission.value.id,
        cdp.value?.id_user ?? null,
        idNewCDP.value?.id_user ?? null
      );
    } catch (e) {
      console.error(e);
    }
    isEditingCdp.value = false;
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/variables.scss';

header {
  width: 100%;
  height: 180px;
  background: url('@/assets/Background.svg');
  background-size: cover;
  background-position: center bottom;
  padding: 0 250px;

  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;

  box-sizing: border-box;

  #header-details {
    flex: 1;

    h1 {
      font-family: 'Inter', sans-serif;
      font-weight: 600;
      font-size: 32px;
      color: $text-white;
      margin-bottom: 5px;
    }

    &-subtitle {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: flex-start;
      gap: 12px;

      color: $text-white;
      font-size: 20px;

      svg {
        cursor: pointer;
      }
    }
  }
}

nav {
  width: 100%;
  padding: 0 250px;
  background-color: $bg-white;
  box-sizing: border-box;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  gap: 40px;

  a {
    color: $text-primary;
    font-size: 15px;
    line-height: 60px;
    font-size: 'Roboto', sans-serif;
    text-decoration: none;

    &.active {
      font-weight: bold;
      border-bottom: solid 3px $primary;
    }
  }
}

.no-cdp {
  font-style: italic;
}
</style>
