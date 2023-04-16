<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="props.height"
    :height="props.height"
    viewBox="0 96 960 960"
  >
    <path
      :fill="props.color ?? 'white'"
      d="M220 876h150V626h220v250h150V486L480 291 220 486v390Zm-60 60V456l320-240 320 240v480H530V686H430v250H160Zm320-353Z"
    />
  </svg>
</template>

<script setup lang="ts">
const props = defineProps({
  height: {
    required: true,
    type: Number,
  },
  color: String,
});
</script>
