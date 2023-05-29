<template>
  <svg
    :width="props.height"
    :height="props.height"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.5 30C16.2188 30 17.625 28.6154 17.625 26.9231H11.375C11.375 28.6154 12.7812 30 14.5 30ZM23.875 20.7692V13.0769C23.875 8.35385 21.3281 4.4 16.8438 3.35385V2.30769C16.8438 1.03077 15.7969 0 14.5 0C13.2031 0 12.1562 1.03077 12.1562 2.30769V3.35385C7.6875 4.4 5.125 8.33846 5.125 13.0769V20.7692L2 23.8462V25.3846H27V23.8462L23.875 20.7692ZM20.75 22.3077H8.25V13.0769C8.25 9.26154 10.6094 6.15385 14.5 6.15385C18.3906 6.15385 20.75 9.26154 20.75 13.0769V22.3077Z"
      fill="white"
    />
  </svg>
</template>

<script setup lang="ts">
const props = defineProps({
  height: {
    required: true,
    type: Number
  },
  width: {
    required: true,
    type: Number
  }
});
</script>
