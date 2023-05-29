<template>
  <div id="toaster">
    <div
      v-for="toast of toasterStore.toasts"
      :key="toast.id"
      @click="() => toasterStore.removeToast(toast.id)"
      class="toast"
      :class="toast.type"
    >
      {{ toast.content }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToasterStore } from '@/stores/toaster';

const toasterStore = useToasterStore();
</script>

<style lang="scss" scoped>
@import '@/assets/variables.scss';

#toaster {
  position: fixed;
  top: 90px;
  right: 10px;

  .toast {
    padding: 15px 20px;
    background-color: $light-primary;
    border: 1px solid darken($light-primary, 15%);
    color: white;
    width: 250px;
    font-size: 12px;

    &.error {
      background-color: $text-red;
      border: 1px solid darken($text-red, 15%);
    }
  }

  z-index: 1000;
}
</style>
