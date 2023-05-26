<template>
  <div class="card-rh-member">
    <div class="card-content">
      {{ props.member.name }}
    </div>
    <div class="card-footer">
      <p>{{ props.member.role }}</p>
      <a :href="`mailto:${props.member.email}`" class="icon-spacing">
        <font-awesome-icon :icon="['far', 'envelope']" />
      </a>

      <a :href="`tel:${props.member.email}`">
        <font-awesome-icon :icon="['fas', 'mobile-screen']" />
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Member } from "@/stores/member";

const props = defineProps<{
  member: Member
}>();
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.card-rh-member {
  background: $bg-white;
  height: 8rem;
  aspect-ratio: 19/9;

  .card-content {
    height: 80%;
    padding: 10px;
    box-sizing: border-box;
  }

  .card-footer {
    background: $background-grey2;
    height: 20%;
    font-size: 0.8rem;

    display: flex;
    flex-flow: row nowrap;

    align-items: center;
    padding: 0 10px;

    a {
      margin-left: 6px;
      color: $element-grey;
    }

    .icon-spacing {
      margin-left: auto;
    }
  }
}
</style>