<template>
  <div class="container">
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
      background: #000;
    }
  }
}
</style>
