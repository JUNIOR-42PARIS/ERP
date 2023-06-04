<template>
  <div class="resume-grid">
    <div class="resume-grid-col resume-grid-col-principale">
      <MissionResumeDescription :mission="mission" />
      <MissionResumeClient :mission="mission" />
    </div>
    <div>
      <MissionResumeHistorique :mission="mission" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { useMissionStore } from '@/stores/mission';
import MissionResumeHistorique from '@/components/mission/resume/MissionResumeHistorique.vue';
import MissionResumeDescription from '@/components/mission/resume/MissionResumeDescription.vue';
import MissionResumeClient from '@/components/mission/resume/MissionResumeClient.vue';

const missionStore = useMissionStore();

const mission = await missionStore.fetchMissionByName(useRoute().params.idMission as string);
</script>

<style lang="scss" scoped>
.resume-grid {
  display: flex;
  flex-flow: row wrap;
  align-items: stretch;
  justify-content: space-between;

  gap: 40px;

  &-col-principale {
    flex: 1;
  }
}
</style>
