
<template>
  <Transition name="slide-form">
    <div v-if="!!formStore.selectedForm" id="form">
      <div id="form-flou" @click="() => formStore.closeForm()"></div>
      <div id="form-side-panel">
        <header>
          <h2>{{ formStore.getFormName }}</h2>
        </header>
        <component :is="formStore.selectedForm"></component>
      </div>
    </div>
  </Transition>

  <nav v-if="!!userStore.user">
    <img src="./assets/logo.png" alt="Logo" id="navbar-logo">
    <RouterLink to="/" exact-active-class="active">Accueil</RouterLink>
    <RouterLink to="/missions" active-class="active">Missions</RouterLink>
    <RouterLink to="/reunions" active-class="active">Réunions</RouterLink>
    <RouterLink to="/ressources-humaines" active-class="active">RH</RouterLink>
    <NavbarNotification id="notification" />
    <div id="user">
      <button @click="toggleUserDropdown">
        <img :src="userStore.user.user_metadata.picture" alt="Avatar" referrerpolicy="no-referrer">
        {{ userStore.user.user_metadata.name }}
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
import { RouterLink, RouterView } from 'vue-router'
import { computed, onMounted, ref, type Ref } from 'vue';

import router from '@/router';
import { supabase } from './stores/supabase';

import NavbarNotification from './components/navbar/NavbarNotification.vue';
import CarretIcon from './components/shared/icons/CarretIcon.vue';
import RotationType from './types/rotation'
import { useUserStore } from '@/stores/supabase';
import { useFormStore } from './stores/form';

const showUserDropdown: Ref<boolean> = ref(false);
const userStore = useUserStore();
const formStore = useFormStore();

onMounted(async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error(error);
    router.push("/login");
    return;
  }
  userStore.setUser(data.user);
})

async function logout() {
  userStore.logout();
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

.slide-form-enter-active {
  transition: all .2s ease-in-out;
  #form-flou, #form-side-panel {
    transition: all .2s ease-in-out;
  }
}

.slide-form-leave-active {
  transition: all .2s ease-in;
  #form-flou, #form-side-panel {
    transition: all .2s ease-in;
  }
}

.slide-form-enter-from,
.slide-form-leave-to {
  #form-side-panel {
    margin-left: 100% !important;
  }
  #form-flou {
    backdrop-filter: blur(0px) !important;
    background-color: rgba(0, 0, 0, 0);
  }
}

#form {
  #form-side-panel {
    position: fixed;
    height: 100vh;
    width: 33.33%;
    margin-left: calc(100% - 33.33%);
    background: $bg-white;
    z-index: 100;

    > header {
      height: 80px;
      background-color: $primary;
      
      h2 {
        line-height: 80px;
        color: $text-white;
        font-size: 20px;
        padding: 0 25px;
      }
    }
  }

  #form-flou {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100vh;
    width: 100%;

    display: block;
    background-color: rgba(0, 0, 0, 25%);
    backdrop-filter: blur(5px);
    opacity: 1;
    z-index: 99;
  }
}

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
