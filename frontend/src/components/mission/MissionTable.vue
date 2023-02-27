<template>
  <table>
    <thead>
      <tr>
        <th class="left">
          <div class="sort">
            <CarretIcon :height="12" :rotation="RotationType.top" />
            <CarretIcon :height="12" :rotation="RotationType.bottom" />
          </div>
          Nom de la mission
        </th>
        <th class="left">
          <div class="sort">
            <CarretIcon :height="12" :rotation="RotationType.top" />
            <CarretIcon :height="12" :rotation="RotationType.bottom" />
          </div>
          Chef de projet
        </th>
        <th class="right">
          Dernière mise à jour
          <div class="sort">
            <CarretIcon :height="12" :rotation="RotationType.top" />
            <CarretIcon :height="12" :rotation="RotationType.bottom" />
          </div>
        </th>
        <th class="right">
          Date de création
          <div class="sort">
            <CarretIcon :height="12" :rotation="RotationType.top" />
            <CarretIcon :height="12" :rotation="RotationType.bottom" />
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><RouterLink class="lien-mission" to="/missions/mission-01">#mission-01</RouterLink></td>
        <td><RouterLink to="/profile/cdp1">@cdp1</RouterLink></td>
        <td class="date">20/02/2023</td>
        <td class="date">01/09/2022</td>
      </tr>
      <tr>
        <td><RouterLink class="lien-mission" to="/missions/mission-01">#mission-01</RouterLink></td>
        <td><RouterLink to="/profile/cdp1">@cdp1</RouterLink></td>
        <td class="date">20/02/2023</td>
        <td class="date">01/09/2022</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import CarretIcon from "@/components/shared/icons/CarretIcon.vue";
import RotationType from "@/types/rotation";
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

table {
  width: 100%;
  margin-top: 30px;
  font-family: "Roboto", sans-serif;
  background-color: white;

  thead {
    background-color: $light-primary;
    color: white;
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