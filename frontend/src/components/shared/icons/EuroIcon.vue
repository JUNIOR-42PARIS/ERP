<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="props.height"
    :height="props.height"
    viewBox="0 96 960 960"
  >
    <path
      :fill="props.color ?? 'white'"
      d="M600 936q-115 0-212.5-67.5T255 686H120v-60h123q-4-28-3.5-50t3.5-50H120v-60h135q35-115 132.5-182.5T600 216q69 0 129.5 23.5T840 308l-43 42q-41-36-92-55t-105-19q-94 0-171.5 52.5T319 466h281v60H304q-5 27-5 50t5 50h296v60H319q32 85 109.5 137.5T600 876q53 0 104-18t94-56l42 42q-44 42-107 67t-133 25Z"
    />
  </svg>
</template>

<script setup lang="ts">
const props = defineProps({
  height: {
    required: true,
    type: Number
  },
  color: String
});
</script>
