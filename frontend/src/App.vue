
<template>
  <nav v-if="!!user">
    <img src="./assets/logo.png" alt="Logo" id="navbar-logo">
    <RouterLink to="/" exact-active-class="active">Accueil</RouterLink>
    <RouterLink to="/missions" active-class="active">Missions</RouterLink>
    <RouterLink to="/reunions" active-class="active">Réunions</RouterLink>
    <RouterLink to="/ressources-humaines" active-class="active">RH</RouterLink>
    <NavbarNotification id="notification" />
    <div id="user">
      <button @click="toggleUserDropdown">
        <img :src="user.user_metadata.picture" alt="Avatar">
        {{ user.user_metadata.name }}
        <CarretIcon :height="19" :rotation="getUserDropdownCarretRotation" />
      </button>
      <div id="user-dropdown" v-if="showUserDropdown">
        <a @click="logout">Se déconnecter</a>
      </div>
    </div>
  </nav>

  <RouterView />
</template>

<script setup lang="ts">
import type { User } from '@supabase/supabase-js';
import { RouterLink, RouterView } from 'vue-router'
import { computed, onMounted, ref, type Ref } from 'vue';

import router from '@/router';
import { supabase } from './stores/supabase';

import NavbarNotification from './components/navbar/NavbarNotification.vue';
import CarretIcon from './components/shared/icons/CarretIcon.vue';
import RotationType from './types/rotation';

const user: Ref<undefined | User> = ref(undefined);
const showUserDropdown: Ref<boolean> = ref(false);

onMounted(async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error(error);
    router.push("/login");
    return;
  }
  user.value = data.user;
})

async function logout() {
  await supabase.auth.signOut();
  user.value = undefined;
  router.push("/login");
}

function toggleUserDropdown(): void {
  showUserDropdown.value = !showUserDropdown.value;
}
const getUserDropdownCarretRotation = computed((): RotationType => {
  if (showUserDropdown.value) {
    return RotationType.top;
  }
  return RotationType.bottom;
});

</script>


<style lang="scss" scoped>
@import "@/assets/variables.scss";

nav {
  background: $primary;

  width: 100%;
  height: 80px;

  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
  justify-content: flex-start;

  a, button {
    font-family: "Roboto", sans-serif;
    border: 0;
    line-height: 80px;
    font-size: 16px;
    text-decoration: none;
    color: white;
    background: transparent;
    cursor: pointer;
    min-width: 5em;
    margin-right: 30px;

    &.active {
      font-weight: bold;
    }
  }

  #navbar-logo {
    height: 40px;
    width: auto;
    margin: auto 67px;
  }
  #notification {
    margin-left: auto;
  }

  #user {
    position: relative;
    margin-right: 67px;

    img, svg {
      vertical-align: middle;
    }

    img {
      border-radius: 40px;
      height: 40px;
      margin-right: 20px;
    }

    svg {
      margin-left: 7px;
    }

    #user-dropdown {
      position: absolute;
      bottom: 0;
      left: 0;

      width: 100%;
      transform: translateY(100%);
      background-color: white;
      padding: 8px 4px;

      a {
        color: black;
        line-height: 16px;
      }
    }
  }
}
</style>
