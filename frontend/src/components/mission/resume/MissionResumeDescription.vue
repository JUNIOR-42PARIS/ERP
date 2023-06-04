<template>
  <div class="card card-primary">
    <div class="card-header">
      <h3>{{ props.mission.nom }}</h3>
      <font-awesome-icon :icon="['fas', 'pencil']" class="edit-icon" />
    </div>
    <div class="card-body">
      <p class="text-description">
        <strong>Description de la mission:</strong><br />
        {{ props.mission.description }}
      </p>

      <div class="ressource-externe">
        <font-awesome-icon :icon="['fab', 'github-alt']" class="icon" />
        <a href="http://google.com" target="_blank" rel="noopener noreferrer">
          JUNIOR-42PARIS / 42adm
        </a>
      </div>

      <div class="ressource-externe">
        <font-awesome-icon :icon="['fab', 'github-alt']" class="icon" />
        <a href="http://google.com" target="_blank" rel="noopener noreferrer">
          JUNIOR-42PARIS / 42adm
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { MissionRowWithMemberListAndClient } from '@/domain/types/Mission';

const props = defineProps<{
  mission: MissionRowWithMemberListAndClient;
}>();
</script>

<style lang="scss" scoped>
.card-body {
  .text-description {
    margin-bottom: 25px;

    line-height: 17px;
    font-size: 14px;

    strong {
      font-weight: 700;
      font-size: 14px;
    }
  }

  .ressource-externe {
    margin-bottom: 10px;
    font-size: 14px;

    .icon {
      height: 16px;
      width: 16px;
      margin-right: 5px;
    }
  }
}
</style>