<template>
  <BaseInput
    :name="props.name"
    :icon="props.icon"
    :label="props.label"
    :modelValue="props.modelValue"
    :required="props.required"
    :error="error"
  >
    <input
      type="text"
      :id="props.name"
      :name="props.name"
      v-model="value"
      :placeholder="props.label.toLowerCase()"
      :required="props.required === true"
    />
  </BaseInput>
</template>

<script setup lang="ts">
import type { ValidationReturnType } from '@/utils/validation';
import { computed, type Component } from 'vue';
import BaseInput from './BaseInput.vue';

const props = defineProps<{
  icon: Component;
  label: string;
  name: string;
  modelValue?: string;
  required?: boolean;
  validation?: (value: string) => ValidationReturnType;
}>();
const emits = defineEmits(['update:modelValue']);

const error = computed((): ValidationReturnType => {
  if (props.validation && props.validation(props.modelValue ?? '') !== true) {
    return props.validation(props.modelValue ?? '');
  }
  return '';
});

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits('update:modelValue', value);
  }
});
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
