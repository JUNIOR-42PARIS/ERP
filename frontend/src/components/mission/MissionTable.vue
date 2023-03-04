<template>
  <table>
    <thead>
      <tr>
        <th class="left">
          <div class="sort">
            <CarretIcon class="carret" color="white" :height="12" :rotation="RotationType.top" />
            <CarretIcon class="carret" color="white" :height="12" :rotation="RotationType.bottom" />
          </div>
          Nom de la mission
        </th>
        <th class="left">
          <div class="sort">
            <CarretIcon class="carret" color="white" :height="12" :rotation="RotationType.top" />
            <CarretIcon class="carret" color="white" :height="12" :rotation="RotationType.bottom" />
          </div>
          Chef de projet
        </th>
        <th class="right">
          Dernière mise à jour
          <div class="sort">
            <CarretIcon class="carret" color="white" :height="12" :rotation="RotationType.top" />
            <CarretIcon class="carret" color="white" :height="12" :rotation="RotationType.bottom" />
          </div>
        </th>
        <th class="right">
          Date de création
          <div class="sort">
            <CarretIcon class="carret" color="white" :height="12" :rotation="RotationType.top" />
            <CarretIcon class="carret" color="white" :height="12" :rotation="RotationType.bottom" />
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="mission of missions" :key="mission.id">
        <td><RouterLink class="lien-mission" :to="`/missions/${mission.nom}`">#{{ mission.nom }}</RouterLink></td> <!-- @TODO -->
        <td><RouterLink to="/profile/cdp1">@cdp1</RouterLink></td> <!-- @TODO -->
        <td class="date">{{ new Date(mission.created_at).toLocaleDateString('fr-FR') }}</td> <!-- @TODO -->
        <td class="date">{{ new Date(mission.created_at).toLocaleDateString('fr-FR') }}</td>
      </tr>
      <tr v-if="missions.length === 0">
        <td colspan="4" class="empty">Aucune mission à afficher</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import MissionStatus from "@/types/missionStatus";
import CarretIcon from "@/components/shared/icons/CarretIcon.vue";
import { useMissionStore } from "@/stores/mission";
import RotationType from "@/types/rotation";
import { computed } from "vue";

const props = defineProps({
  type: {
    type: String,
    required: true,
    default: MissionStatus.mission,
    validator(value: string) {
      return Object.keys(MissionStatus).includes(value);
    },
  }
});

const missionStore = useMissionStore();

const missions = computed(() => {
  if (!missionStore.missions)
    return [];
  return missionStore.missions?.filter((mission) => mission.status === props.type)
})
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.carret {
  cursor: pointer;
}

table {
  width: 100%;
  margin-top: 30px;
  font-family: "Roboto", sans-serif;
  background-color: white;

  thead {
    background-color: $light-primary;
    color: $text-white;
    font-weight: 600;
    
    th {
      padding-top: 18px;
      padding-bottom: 18px;
      font-size: 14px;

      &.left {
        text-align: left;

        .sort {
          margin-right: 10px;
        }
      }
      &.right {
        text-align: right;

        .sort {
          margin-left: 10px;
        }
      }

      .sort {
        display: inline-flex;
        vertical-align: middle;
        flex-flow: column nowrap;
      }
    }

    th:first-child {
      padding-left: 25px;
    }

    th:last-child {
      padding-right: 25px;
    }
  }

  tbody {
    tr {
      position: relative;

      td {
        font-size: 14px;
        padding-top: 14px;
        padding-bottom: 14px;

        &:first-child {
          padding-left: 30px;
        }
        &:last-child {
          padding-right: 30px;
        }

        a {
          color: $primary;
          text-decoration: none;
        }

        .lien-mission {
          font-weight: bold;
        }

        &.date {
          text-align: right;
          color: $text-grey;
        }
        
        &.empty {
          text-align: center;
          color: $text-grey;
        }
      }

      &::after {
        content: "";
        height: 1px;
        width: 85%;
        background-color: #F4F4F4;
        display: block;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
      }
      &:last-child::after {
        height: 0px;
      }
    }
  }
}
</style>