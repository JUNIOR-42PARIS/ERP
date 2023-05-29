<template>
  <div class="card-rh-member" :class="{ 'card-rh-member-active': props.active }" @click="setActive">
    <div class="card-rh-member-content">
      <div class="card-rh-member-content-header">
        <div>
          <p>{{ props.member.name }}</p>
          <p v-if="props.member.pseudo" class="member-pseudo">@{{ props.member.pseudo }}</p>
        </div>

        <font-awesome-icon
          :icon="['fas', 'gear']"
          class="card-rh-member-content-header-gear"
          v-if="canUserEditMember"
          @click="editMember"
        />
      </div>
    </div>
    <div class="card-rh-member-footer">
      <p>{{ props.member.role }}</p>

      <a :href="`mailto:${props.member.email}`" class="icon-spacing">
        <font-awesome-icon :icon="['far', 'envelope']" />
      </a>

      <a :href="`tel:${props.member.phone}`" v-if="props.member.phone">
        <font-awesome-icon :icon="['fas', 'mobile-screen']" />
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useFormStore } from '@/stores/form';
import { useMemberStore, type Member } from '@/stores/member';
import { useUserStore } from '@/stores/supabase';
import { computed } from 'vue';

const props = defineProps<{
  member: Member,
  active?: boolean;
}>();

const emits = defineEmits<{
  (e: "active"): void
}>();

const userStore = useUserStore();
const formStore = useFormStore();
const memberStore = useMemberStore();

const canUserEditMember = computed((): boolean => {
  return userStore.isAdmin === true;
});

function editMember() {
  if (!canUserEditMember.value) {
    return;
  }
  memberStore.editingMember = props.member;
  formStore.showMemberEdit();
}

function setActive() {
  emits("active");
}
</script>

<style lang="scss" scoped>
@import '@/assets/variables.scss';

.card-rh-member {
  background: $bg-white;
  height: 8rem;
  aspect-ratio: 19/9;
  outline-style: solid;
  outline-color: $light-primary;
  outline-width: 0;

  transition: outline-width 0.2s, border-radius 0.2s, box-shadow 0.2s;

  &.card-rh-member-active {
    outline-width: 0.1rem;
    border-radius: 3px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  }

  &-content {
    height: 80%;
    padding: 10px;
    box-sizing: border-box;

    &-header {
      display: flex;
      flex-flow: row nowrap;
      align-items: flex-start;
      justify-content: space-between;

      &-gear {
        color: $element-grey;
        cursor: pointer;
      }
    }
  }

  &-footer {
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

.member-pseudo {
  color: $element-grey;
  padding: 4px 0;
}
</style>
