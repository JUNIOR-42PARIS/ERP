<template>
  <div class="container">
    <p  v-if="userStore.is_admin" @click="createMission">Nouvelle mission</p>

    <div class="bloc-missions">
      <div class="bloc-missions-entete">
        <h2>Missions en cours</h2>
        <div class="separateur"></div>
      </div>
      <MissionTable></MissionTable>
    </div>
    
    <div class="bloc-missions">
      <div class="bloc-missions-entete">
        <h2>Prospects en cours</h2>
        <div class="separateur"></div>
      </div>
      <MissionTable></MissionTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import MissionTable from "@/components/mission/MissionTable.vue";
import { supabase, useUserStore } from "@/stores/supabase";

const userStore = useUserStore()

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
