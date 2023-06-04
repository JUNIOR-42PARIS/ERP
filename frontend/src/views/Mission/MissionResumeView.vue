<template>
  <div class="card card-primary">
    <div class="card-header">
      <h3>{{ mission.nom }}</h3>
      <font-awesome-icon :icon="['fas', 'pencil']" class="edit-icon"/>
    </div>
    <div class="card-body">
      <p class="text-description">
        <strong>Description de la mission:</strong><br/>
        {{ mission.description }}
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
  
  <div class="card">
    <div class="card-header">
      <h3>Client</h3>
      <font-awesome-icon :icon="['fas', 'pencil']" class="edit-icon"/>
    </div>
    <div class="card-body">
      <div class="client-grid">
        <div class="client-grid-column">
          <div>
            <p class="client-field">Nom du client</p>
            <p class="client-content">
              {{ mission.client }}
            </p>
          </div>
          <div>
            <p class="client-field">Adresse du client</p>
            <p class="client-content">
              {{ mission.client }}
            </p>
          </div>
        </div>
        <div class="client-grid-column">
          <div>
            <p class="client-field">Nom de l'intérmédiaire</p>
            <p class="client-content">
              {{ mission.client }}
            </p>
          </div>
          <div>
            <p class="client-field">Email</p>
            <p class="client-content">
              {{ mission.client }}
            </p>
          </div>
        </div>
        <div class="client-grid-column">
          <div>
            <p class="client-field">
              Première mission de ce client
              <font-awesome-icon :icon="['fas', 'check']" class="check-icon"/>
            </p>
          </div>
          <div>
            <p class="client-field">SIRET</p>
            <p class="client-content">
              {{ mission.client }}
            </p>
          </div>
          
          <div>
            <p class="client-field">Numéro de TVA</p>
            <p class="client-content">
              {{ mission.client }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { useMissionStore } from '@/stores/mission';

const missionStore = useMissionStore();

const mission = await missionStore.fetchMissionByName(useRoute().params.idMission as string);
</script>

<style lang="scss" scoped>
.card-body {
  .text-description {
    margin-bottom: 25px;

    line-height: 17px;
    font-size: 12px;
    
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

.client-grid {
  display: flex;
  flex-flow: row wrap;

  align-items: flex-start;
  justify-content: space-between;

  &-column {
    display: flex;
    flex-flow: column nowrap;

    gap: 25px;
  }
}

.client {
  &-field {
    font-weight: 700;
    font-size: 14px;
    margin-bottom: 5px;

    .check-icon {
      margin-left: 18px;
    }
  }
  &-content {
    font-size: 12px;
    line-height: 14px;
  }
}

</style>
