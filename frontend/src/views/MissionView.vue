<template>
  <div class="container">
    <header>
      <h1>Missions</h1>
      <button v-if="userStore.is_admin" @click="createMission" class="btn">Nouvelle mission</button>
    </header>

    <div class="bloc-missions">
      <div class="bloc-missions-entete">
        <h2>Missions en cours</h2>
        <div class="separateur"></div>
      </div>
      <MissionTable :type="MissionStatus.mission"></MissionTable>
    </div>
    
    <div class="bloc-missions">
      <div class="bloc-missions-entete">
        <h2>Prospects en cours</h2>
        <div class="separateur"></div>
      </div>
      <MissionTable :type="MissionStatus.prospect"></MissionTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import MissionTable from "@/components/mission/MissionTable.vue";
import { supabase, useUserStore } from "@/stores/supabase";
import { useMissionStore } from "@/stores/mission";
import { onMounted } from "vue";
import MissionStatus from "@/types/missionStatus";

const userStore = useUserStore();
const missionStore = useMissionStore();

onMounted(async () => {
  await missionStore.fetchMissions();
});

async function createMission() {
  const { data, error } = await supabase
    .from('missions')
    .insert([
      { numero_mission: 1, description: "test", created_by: userStore.user?.id },
    ])
    console.log(data, error)
}
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

header {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;

  h1 {
    font-size: 24px;
  }
}

.bloc-missions {
  margin-bottom: 55px;
  
  .bloc-missions-entete {
    display: flex;
    flex-flow: row wrap;
    align-items: center;

    h2 {
      font-size: 16px;
      font-weight: 500;
      line-height: 19px;
      margin-right: 40px;
    }
    .separateur {
      content: '';
      display: block;
      flex: 1;
      height: 1px;
      background: $element-grey;
    }
  }
}
</style>
