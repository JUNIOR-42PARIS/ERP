<template>
    <svg :width="props.height" :height="props.height" :rotate="rotation" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.58625 5L9.75 10.1525L14.9138 5L16.5 6.58625L9.75 13.3363L3 6.58625L4.58625 5Z" fill="white"/>
    </svg>
</template>

<script lang="ts" setup>
import RotationType from "@/types/rotation";
import { ref } from "vue";

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
        required: true,
    }
});

let rotation = ref(0);
switch (props.rotation) {
    case RotationType.bottom:
        rotation.value = 0;
        break
    case RotationType.top:
        rotation.value = 180;
        break
    case RotationType.left:
        rotation.value = 90;
        break
    case RotationType.right:
        rotation.value = 270;
        break
}
</script>