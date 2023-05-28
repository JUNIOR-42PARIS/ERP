<template>
  <template v-if="!isEditingCdp">
    <RouterLink v-if="cdp !== null" to="/membre/user1" class="resource-link">{{
      cdp.name
    }}</RouterLink>
    <span class="no-cdp" v-else>Aucun</span>

    <font-awesome-icon :icon="['far', 'pen-to-square']" @click="toggleEditionCdp" />
  </template>
  <template v-else>
    <Multiselect
      :options="memberList"
      label="name"
      track-by="id_user"
      v-model="idNewCDP"
      width="100px"
      @close="editCdp"
      data-test="select"
    />
  </template>
</template>

<script lang="ts" setup>
import { useMemberStore, type Member } from '@/stores/member';
import { IntervenantType, type MissionRowWithMemberList } from '@/stores/mission';
import { computed, ref } from 'vue';
import Multiselect from 'vue-multiselect';

const props = defineProps<{
  mission: MissionRowWithMemberList;
}>();
const emits = defineEmits<{
  (
    e: 'edit-cdp',
    payload: {
      idOldCdp: string | null;
      idNewCdp: string | null;
    }
  ): void;
}>();

const memberStore = useMemberStore();

const isEditingCdp = ref<boolean>(false);
const idNewCDP = ref<Member | null>(null);

const memberList = computed((): Member[] => {
  return memberStore.memberList;
});

const cdp = computed(() => {
  if (!props.mission) return null;
  const cdpList = props.mission.members_type.filter(
    (member) => member.type === IntervenantType.CDP
  );
  if (cdpList.length === 0) return null;
  return cdpList[0].member;
});

async function toggleEditionCdp() {
  await memberStore.fetchMemberCdpOrAdminList();

  if (cdp.value) {
    idNewCDP.value = cdp.value;
  }

  isEditingCdp.value = !isEditingCdp.value;
}

async function editCdp() {
  if (idNewCDP.value?.id_user !== cdp.value?.id_user) {
    emits('edit-cdp', {
      idOldCdp: cdp.value?.id_user ?? null,
      idNewCdp: idNewCDP.value?.id_user ?? null
    });
  }
  isEditingCdp.value = false;
}
</script>
