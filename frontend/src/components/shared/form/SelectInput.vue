<template>
  <BaseInput :name="props.name" :label="props.label" :model-value="''" :required="props.required" :validation="props.validation">
    <Multiselect
        :model-value="props.modelValue"
        @update:model-value="(v: Object | string | null) => emit('update:modelValue', v)"
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

const props = defineProps<{
  label: string,
  name: string,
  options: Object[] | string[],
  searchable: boolean,
  showLabels: boolean,
  modelValue?: string | Object | null,
  required?: boolean,
  validation?: (value: string) => ValidationReturnType,
}>();

const emit = defineEmits(['update:modelValue']);
</script>