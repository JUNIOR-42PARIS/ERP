<template>
  <svg
    :width="props.height"
    :height="props.height"
    :style="{ transform: `rotate(${getRotation}deg)` }"
    viewBox="0 0 19 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.58625 5L9.75 10.1525L14.9138 5L16.5 6.58625L9.75 13.3363L3 6.58625L4.58625 5Z"
      :fill="props.color ?? 'white'"
    />
  </svg>
</template>

<script lang="ts" setup>
import RotationType from '@/types/rotation';
import { computed } from 'vue';

const props = defineProps({
  height: {
    required: true,
    type: Number
  },
  rotation: {
    default: RotationType.right,
    type: String,
    validator: (value: string): boolean => {
      return Object.keys(RotationType).includes(value);
    },
    required: true
  },
  color: String
});

const getRotation = computed((): number => {
  switch (props.rotation) {
    case RotationType.bottom:
      return 0;
    case RotationType.top:
      return 180;
    case RotationType.left:
      return 90;
    case RotationType.right:
      return 270;
  }
  return 0;
});
</script>
