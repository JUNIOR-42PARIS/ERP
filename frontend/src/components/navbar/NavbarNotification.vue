<template>
    <div id="notification">
        <NotificationIcon :height="30" :width="30" />
        <span id="red-bubble" v-if="hasNotification"></span>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import NotificationIcon from '../shared/icons/NotificationIcon.vue';

const hasNotification = ref(false);
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

#notification {
    margin-top: calc((80px - 30px) / 2);
    margin-right: 30px;
    position: relative;
}

#red-bubble {
    position: absolute;
    right: 0;
    top: 0;

    content: '';
    height: 10px;
    width: 10px;
    border-radius: 10px;
    background-color: $red;
}
</style>