<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="props.height"
    :height="props.height"
    viewBox="0 96 960 960"
  >
    <path
      :fill="props.color ?? 'white'"
      d="M80 936V216h390v165h410v555H80Zm60-60h270V771H140v105Zm0-165h270V606H140v105Zm0-165h270V441H140v105Zm0-165h270V276H140v105Zm330 495h350V441H470v435Zm80-270v-60h165v60H550Zm0 165v-60h165v60H550Z"
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
