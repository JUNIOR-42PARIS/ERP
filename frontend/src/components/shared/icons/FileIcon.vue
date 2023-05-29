<template>
  <svg
    :width="props.height"
    :height="props.height"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_29_1085)">
      <path
        d="M11.6666 1.66669H4.99992C4.08325 1.66669 3.34159 2.41669 3.34159 3.33335L3.33325 16.6667C3.33325 17.5834 4.07492 18.3334 4.99159 18.3334H14.9999C15.9166 18.3334 16.6666 17.5834 16.6666 16.6667V6.66669L11.6666 1.66669ZM4.99992 16.6667V3.33335H10.8333V7.50002H14.9999V16.6667H4.99992Z"
        :fill="props.color ?? 'white'"
      />
    </g>
    <defs>
      <clipPath id="clip0_29_1085">
        <rect width="20" height="20" :fill="props.color ?? 'white'" />
      </clipPath>
    </defs>
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
