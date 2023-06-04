<template>
    
    <div class="card">
        <div class="card-header">
          <h3>Client</h3>
          <font-awesome-icon :icon="['fas', 'pencil']" class="edit-icon" />
        </div>
        <div class="card-body">
          <div class="client-grid">
            <div class="client-grid-column">
              <div>
                <p class="client-field">Nom du client</p>
                <p class="client-content">
                  {{ props.mission.client.nom }}
                </p>
              </div>
              <div>
                <p class="client-field">Adresse du client</p>
                <p class="client-content">
                  {{ props.mission.client.adresse }}
                </p>
              </div>
            </div>
            <div class="client-grid-column">
              <div>
                <p class="client-field">Nom de l'intérmédiaire</p>
                <p class="client-content" v-if="props.mission.nom_intermediaire">
                  {{ props.mission.nom_intermediaire }}
                </p>
                <p class="client-content client-content-inconnu" v-else>
                  Inconnu
                </p>
              </div>
              <div>
                <p class="client-field">Email</p>
                <p class="client-content" v-if="props.mission.email_intermediaire">
                  <a :href="`mailto:${props.mission.email_intermediaire}`">{{ props.mission.email_intermediaire }}</a>
                </p>
                <p class="client-content client-content-inconnu" v-else>
                  Inconnu
                </p>
              </div>
            </div>
            <div class="client-grid-column">
              <div>
                <p class="client-field">
                  Première mission de ce client
                  <font-awesome-icon :icon="['fas', 'check']" class="check-icon" />
                </p>
              </div>
              <div>
                <p class="client-field">SIRET</p>
                <p class="client-content" v-if="props.mission.client.siret">
                  {{ props.mission.client.siret }}
                </p>
                <p class="client-content client-content-inconnu" v-else>
                  Inconnu
                </p>
              </div>

              <div>
                <p class="client-field">Numéro de TVA</p>
                <p class="client-content" v-if="props.mission.client.numero_tva">
                  {{ props.mission.client.numero_tva }}
                </p>
                <p class="client-content client-content-inconnu" v-else>
                  Inconnu
                </p>
              </div>
            </div>
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
    font-size: 15px;
    margin-bottom: 5px;

    .check-icon {
      margin-left: 18px;
    }
  }

  &-content {
    font-size: 14px;
    line-height: 16px;

    &-inconnu {
      font-style: italic;
    }
  }
}
</style>