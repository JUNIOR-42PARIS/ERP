<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="props.height"
    :height="props.height"
    viewBox="0 96 960 960"
  >
    <path
      :fill="props.color ?? 'white'"
      d="m250 896 43-170H140l15-60h153l45-180H180l15-60h173l42-170h59l-42 170h181l42-170h59l-42 170h153l-15 60H652l-45 180h173l-15 60H592l-42 170h-60l43-170H352l-42 170h-60Zm117-230h181l45-180H412l-45 180Z"
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
