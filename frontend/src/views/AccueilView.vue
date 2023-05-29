<template>
  <div class="container grid-row">
    <div class="grid-col">
      <div class="carte" id="calendrier">
        <h2>Calendrier</h2>

        <!-- @todo -->
      </div>
      <div class="grid-row">
        <div class="carte carte-liste">
          <h2>Informations importantes</h2>

          <div class="carte-element-liste">
            <div class="ligne-importante">
              <p>Bienvenue à <MemberLink :member="fakeMember" /> qui rejoint les CDP</p>
              <span class="date">21/02/2023</span>
            </div>
            <div class="ligne-importante">
              <p>Nouveau prospect <MissionLink :mission="fakeMission" /></p>
              <span class="date">21/02/2023</span>
            </div>
            <div class="ligne-importante">
              <p>Prospect converti en client <MissionLink :mission="fakeMission" /> 🎉</p>
              <span class="date">21/02/2023</span>
            </div>
          </div>
        </div>
        <div class="carte carte-liste">
          <h2>Mes missions</h2>

          <div class="carte-element-liste">
            <div class="ligne-importante">
              <MissionLink :mission="fakeMission" />
              <span class="date">Dernière màj il y a 10 min</span>
            </div>
            <div class="ligne-importante">
              <MissionLink :mission="fakeMission" />
              <span class="date">Dernière màj il y a 18 heures</span>
            </div>
            <div class="ligne-importante">
              <MissionLink :mission="fakeMission" />
              <span class="date">Dernière màj il y a 2 mois</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="carte">
      <h2>Effort produit par la Junior</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import MemberLink from '@/components/shared/MemberLink.vue';
import MissionLink from '@/components/shared/MissionLink.vue';
import type { Member } from '@/stores/member';
import type { MissionRow } from '@/stores/mission';

const fakeMember: Member = {
  name: "cdp2",
  role: "chef de projet",
  email: "cdp@test.com",
  phone: "",
  pseudo: "cdp2",
  id_user: "",
};

const fakeMission: MissionRow = {
  nom: "mission-01",
  id: 0,
  client: "",
  status: "prospect",
  created_by: "",
  telephone_intermediaire: null,
  created_at: new Date().toLocaleString(),
  lien_drive: "",
  description: "",
  lien_github: "",
  nom_intermediaire: "",
  email_intermediaire: "",
};
</script>

<style lang="scss" scoped>
@import '@/assets/variables.scss';

.grid-col,
.grid-row {
  display: flex;
  flex-wrap: nowrap;
  gap: 22px;

  &.grid-col {
    width: 100%;

    flex-direction: row;
    justify-content: stretch;

    > * {
      width: 50%;
    }
  }

  &.grid-row {
    flex-direction: column;
    justify-content: flex-start;

    > * {
      height: 50%;
    }
  }
}

.carte {
  position: relative;
  padding: 15px;
  background-color: white;
  box-sizing: border-box;

  h2 {
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    font-family: 'Roboto';
  }
}

#calendrier {
  aspect-ratio: 1/0.8;
}

.carte-liste {
  box-sizing: border-box;

  .carte-element-liste {
    margin-top: 15px;
    margin-bottom: 15px;
    height: calc(100% - 15px * 2);
    overflow-y: scroll;
    box-sizing: border-box;

    .ligne-importante {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;

      margin-bottom: 10px;

      p,
      span,
      a {
        font-size: 14px;
        font-weight: 400;
      }

      span {
        font-size: 10px;
        color: $text-grey;
      }
    }
  }
}
</style>
