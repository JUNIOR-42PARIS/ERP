import FormMissionAddVue from '@/components/form/FormMissionAdd.vue';
import FormMemberEditVue from '@/components/form/FormMemberEdit.vue';

import { defineStore } from 'pinia';
import { computed, shallowRef, type Component, type Ref } from 'vue';

export const useFormStore = defineStore('form', () => {
  const selectedForm: Ref<undefined | Component> = shallowRef(undefined);

  function showMissionCreate() {
    selectedForm.value = FormMissionAddVue;
  }

  function showMemberEdit() {
    selectedForm.value = FormMemberEditVue;
  }

  function closeForm() {
    selectedForm.value = undefined;
  }

  const getFormName = computed(() => {
    switch (selectedForm.value) {
      case FormMissionAddVue:
        return "Créer un prospect/mission";
      case FormMemberEditVue:
        return "Modifier un membre";

      default:
        return "Inconnu";
    }
  });

  return { selectedForm, showMissionCreate, showMemberEdit, closeForm, getFormName };
});
