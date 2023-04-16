<template>
  <div class="card card-primary">
    <div class="header">
      <h4>{{ mission.nom }}</h4>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import { useMissionStore } from "@/stores/mission";

const missionStore = useMissionStore();

const mission = await missionStore.fetchMission(
  useRoute().params.idMission as string
);
</script>

<style lang="scss"></style>
