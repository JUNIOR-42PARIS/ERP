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
</template>

<script setup lang="ts">
import { useFormStore } from "@/stores/form";

const formStore = useFormStore();
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.slide-form-enter-active {
  transition: all 0.2s ease-in-out;

  #form-flou,
  #form-side-panel {
    transition: all 0.2s ease-in-out;
  }
}

.slide-form-leave-active {
  transition: all 0.2s ease-in;

  #form-flou,
  #form-side-panel {
    transition: all 0.2s ease-in;
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
    content: "";
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
</style>
