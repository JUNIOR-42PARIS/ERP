<template>
  <RouterLink class="resource-link" :to="{ name: 'missions-index', params: { idMission: props.mission.nom } }">#{{ props.mission.nom }}</RouterLink>
</template>

<script lang="ts" setup>
import type { MissionRow } from '@/stores/mission';

const props = defineProps<{
  mission: MissionRow;
}>();
</script>
