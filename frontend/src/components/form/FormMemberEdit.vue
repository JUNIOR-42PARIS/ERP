<template>
  <div v-if="memberEditing">
    <div class="form-container">
      <div class="form-row">
        <TextInput :icon="UserIcon" name="name" label="Prénom Nom" v-model="memberEditing.name" :validation="isNameTextLengthValid()" :required="true" />
      </div>
      <div class="form-row">
        <SelectInput label="Role" name="role" :options="roleNameList" :searchable="true" :show-labels="false" v-model="memberEditing.role" />
      </div>
      
      <div class="form-row">
        <TextInput :icon="EmailIcon" name="mission_email_intermediaire" label="Email de l'intermédiaire" v-model="memberEditing.email" :validation="isNameTextLengthValid()"/>
      </div>
      <div class="form-row">
        <TextInput :icon="PhoneIcon" name="mission_telephone_intermediaire" label="Téléphone de l'intermédiaire" v-model="memberEditing.phone" :validation="isNameTextLengthValid(0, 10)"/>
      </div>
    </div>

    <div class="form-footer">
      <button class="btn grey" @click="() => emits('close')">Annuler</button>
      <button type="submit" class="btn">Créer</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useMemberStore, type Member } from '@/stores/member';
import TextInput from '../shared/form/TextInput.vue';
import UserIcon from '../shared/icons/UserIcon.vue';
import { computed, ref } from 'vue';
import { useRoleStore, type Role } from '@/stores/role';
import EmailIcon from '../shared/icons/EmailIcon.vue';
import PhoneIcon from '../shared/icons/PhoneIcon.vue';
import { isNameTextLengthValid } from '@/utils/validation';
import SelectInput from '../shared/form/SelectInput.vue';

const emits = defineEmits<{
  (e: 'close'): void
}>();

const memberStore = useMemberStore();
const roleStore = useRoleStore();

await roleStore.fetchRoles();

const memberEditing = ref<Member | null>(Object.assign({}, memberStore.editMember));

const roleList = computed((): Role[] => {
  return roleStore.roles;
});
const roleNameList = computed((): string[] => {
  return roleList.value.map((role) => role.name);
});
</script>

<style lang="scss" scoped>
label {
  display: block;
  padding-bottom: 10px;
}
</style>