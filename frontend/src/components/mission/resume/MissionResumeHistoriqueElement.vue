<template>
  <div class="historique-element">
    <div class="icon-container">
      <div class="icon" :class="iconColor">
        <font-awesome-icon :icon="icon" class="icon-svg" />
      </div>
    </div>
    
    <div class="description">
      <p>{{ title }}</p>
      <p class="content">{{ props.content }}</p>
    </div>
    
    <div class="details">
      <p><MemberLink :member="by" /></p>
      <p class="details-date">{{ getFormattedDate(props.at) }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { MissionHistorique } from '@/domain/enums/MissionHistorique';
import { computed } from 'vue';
import MemberLink from '@/components/shared/MemberLink.vue';
import { getFormattedDate } from '@/utils/time';
import type { Member } from '@/domain/types/Member';

const props = defineProps<{
  type: MissionHistorique,
  content: string,
  by: Member,
  at: Date,
}>();

const title = computed<string>(() => {
  switch (props.type) {
    case MissionHistorique.AJOUT_MEMBRE:
      return "Ajout d'un membre";

    case MissionHistorique.NOUVEAU_DOCUMENT:
      return "Nouveau document";
      
    case MissionHistorique.NOUVELLE_MISSION:
      return "Nouvelle mission";
      
    case MissionHistorique.NOUVELLE_VERSION:
      return "Nouvelle version d'un doc.";
      
    case MissionHistorique.RETRAIT_MEMBRE:
      return "Retrait d'un membre";
  
    case MissionHistorique.SUPPRESSION_DOCUMENT:
      return "Suppression d'un doc.";

    default:
      return "";
  }
});

const icon = computed<string[]>(() => {
  switch (props.type) {
    case MissionHistorique.AJOUT_MEMBRE:
      return ['fas', 'user-plus'];
      
    case MissionHistorique.NOUVEAU_DOCUMENT:
      return ['fas', 'file-import'];
      
    case MissionHistorique.NOUVELLE_MISSION:
      return ['fas', 'folder-plus'];
      
    case MissionHistorique.NOUVELLE_VERSION:
      return ['fas', 'code-pull-request'];
      
    case MissionHistorique.RETRAIT_MEMBRE:
      return ['fas', 'user-minus'];
  
    case MissionHistorique.SUPPRESSION_DOCUMENT:
      return ['fas', 'file-circle-minus'];
  
    default:
      return ['fas', 'question'];
  }
});

const iconColor = computed<string>(() => {
  switch (props.type) {
    case MissionHistorique.AJOUT_MEMBRE:
      return "icon-green";

    case MissionHistorique.NOUVEAU_DOCUMENT:
      return "icon-green";
      
    case MissionHistorique.NOUVELLE_MISSION:
      return "icon-blue";
      
    case MissionHistorique.NOUVELLE_VERSION:
      return "icon-green";
      
    case MissionHistorique.RETRAIT_MEMBRE:
      return "icon-red";
  
    case MissionHistorique.SUPPRESSION_DOCUMENT:
      return "icon-red";

    default:
      return "";
  }
});
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.historique-element {
  display:flex;
  flex-direction: row;

  align-items: flex-start;
  justify-content: flex-start;

  font-size: 14px;

  font-family: "Roboto";

  .icon-container {
    position: relative;
    align-self: stretch;

    padding-top: 10px;

    .icon {
      position: relative;

      width: 30px;
      height: 30px;
    
      background: $primary;
      border-radius: 50px;
    
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      z-index: 2;
    
      &-svg {
        height: 15px;
        width: 15px;
        color: $bg-white;
      }

      &-green {
        background: $green;
      }
      &-blue {
        background: $primary;
      }
      &-red {
        background: $red;
      }
    }

    &::before {
      content: '';

      position: absolute;
      top: 0;
      left: 50%;

      height: 100%;
      width: 2px;

      background-color: $background-grey;

      transform: translateX(-50%);
    }
  }

  & > :not(.icon-container) {
    padding: 17.5px 0;
  }

  .description {
    margin-left: 10px;
    letter-spacing: 0.01em;

    :first-child {
      padding-bottom: 5px;
    }
    .content {
      color: $element-grey;
      font-style: italic;
    }
  }

  .details {
    margin-left: auto;
    text-align: right;

    :first-child {
      padding-bottom: 5px;
    }

    &-date {
      color: $element-grey;
      font-size: 12px;
    }
  }
}
</style>