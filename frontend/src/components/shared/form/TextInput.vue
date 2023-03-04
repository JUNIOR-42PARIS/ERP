<template>
  <label :style="{fontStyle: props.required !== true ? 'italic' : ''}" :for="props.name">{{ props.label }}</label>
  <div class="input">
    <component :is="props.icon" class="icon" :width="20" :height="20" color="#A3A3A3" />
    <input type="text" :name="props.name" v-model="value" :placeholder="props.label.toLowerCase()" :required="props.required === true">
  </div>
</template>

<script setup lang="ts">
import { computed, type Component } from "vue";

const props = defineProps<{ icon: Component, label: string, name: string, modelValue?: string, required?: boolean }>()
const emit = defineEmits(['update:modelValue']);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value)
  }
})
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

label {
  display: block;
  padding-bottom: 10px;
}
.input {
  width: 100%;
  border: 1px solid $element-grey;
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
  justify-content: stretch;

  .icon {
    padding: 10px;
  }
  input {
    flex: 1;
    border: 0;
    font-size: 14px;
    font-family: "Inter";

    &:focus {
      outline: none;
    }
  }
}
</style>