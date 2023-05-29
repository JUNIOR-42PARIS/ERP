<template>
  <Suspense>
    <div v-if="mission">
      <header>
        <div id="header-details">
          <h1>{{ mission.nom }}</h1>
          <div id="header-details-subtitle">
            Chef de projet

            <MissionChefDeProjetSelect :mission="mission" @edit-cdp="editCdp" />
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
import MissionChefDeProjetSelect from '@/components/mission/MissionChefDeProjetSelect.vue';
import { useMissionStore } from '@/stores/mission';
import { computed } from 'vue';

const missionStore = useMissionStore();

await missionStore.fetchMissionFromUrl();

const mission = computed(() => {
  return missionStore.mission;
});

async function editCdp(payload: { idOldCdp: string | null; idNewCdp: string | null }) {
  if (mission.value) {
    await missionStore.editCdpForMission(mission.value.id, payload.idOldCdp, payload.idNewCdp);
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

</style>
