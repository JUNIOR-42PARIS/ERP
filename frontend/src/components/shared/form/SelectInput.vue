<template>
  <BaseInput :name="props.name" :label="props.label" :required="props.required" :error="error">
    <Multiselect
      :model-value="props.modelValue"
      @update:model-value="(v: Object | string | null) => emits('update:modelValue', v)"
      :options="props.options"
      :searchable="props.searchable"
      :show-labels="props.showLabels"
    />
  </BaseInput>
</template>

<script lang="ts" setup>
import type { ValidationReturnType } from '@/utils/validation';
import BaseInput from './BaseInput.vue';
import Multiselect from 'vue-multiselect';
import { computed } from 'vue';

const props = defineProps<{
  label: string;
  name: string;
  options: Object[] | string[];
  searchable: boolean;
  showLabels: boolean;
  modelValue?: string | Object | null;
  required?: boolean;
  validation?: (value: string | Object | null) => ValidationReturnType;
}>();

const error = computed((): ValidationReturnType => {
  if (props.validation && props.validation(props.modelValue ?? '') !== true) {
    return props.validation(props.modelValue ?? '');
  }
  return '';
});

const emits = defineEmits(['update:modelValue']);
</script>
