<template>
  <label
    :style="{ fontStyle: props.required !== true ? 'italic' : '' }"
    :class="{ error: error }"
    :for="props.name"
    >{{ props.label }}</label
  >
  <div class="input" :class="{ error: error }" v-if="props.icon">
    <component
      :is="props.icon"
      class="icon"
      :width="20"
      :height="20"
      :color="error ? '#B41F1F' : '#A3A3A3'"
    />
    <slot></slot>
  </div>
  <slot v-else :class="{ input: true, error: error }"></slot>
  <span class="error-text">{{ error ?? '' }}</span>
</template>

<script setup lang="ts">
import type { ValidationReturnType } from '@/utils/validation';
import type { Component } from 'vue';

const props = defineProps<{
  icon?: Component;
  label: string;
  name: string;
  required?: boolean;
  error: ValidationReturnType;
}>();
</script>

<style lang="scss" scoped>
@import '@/assets/variables.scss';

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
    font-family: 'Inter';

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
  min-height: 12px;
}
</style>
