<template>
  <label :style="{fontStyle: props.required !== true ? 'italic' : ''}" :class="{ 'error': isError }" :for="props.name">{{ props.label }}</label>
  <div class="input" :class="{'error': isError }">
    <component :is="props.icon" class="icon" :width="20" :height="20" :color="isError ? '#B41F1F' : '#A3A3A3'" />
    <input type="text" :id="props.name" :name="props.name" v-model="value" :placeholder="props.label.toLowerCase()" :required="props.required === true">
  </div>
  <span v-if="isError" class="error-text">{{ isError }}</span>
</template>

<script setup lang="ts">
import type { ValidationReturnType } from "@/utils/validation";
import { computed, type Component } from "vue";

const props = defineProps<{
  icon: Component,
  label: string,
  name: string,
  modelValue?: string,
  required?: boolean,
  validation?: (value: string) => ValidationReturnType
}>();
const emit = defineEmits(['update:modelValue']);

const isError = computed(() => {
  if (props.validation && props.validation(props.modelValue ?? "") !== true) {
    return props.validation(props.modelValue ?? "");
  }
  return false;
});

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  }
});
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

label {
  display: block;
  padding-bottom: 10px;
  &.error {
    color: $text-red;
  }
}
.input {
  width: 100%;
  border: 1px solid $element-grey;
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
  justify-content: stretch;

  &.error {
    border-color: $text-red;

    input {
      color: $text-red;
    }
  }

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

span.error-text {
  font-size: 12px;
  display: block;
  margin: 4px 0;
  color: $text-red;
}
</style>