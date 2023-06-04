<template>
  <div class="card card-historique">
    <div class="card-header">
      <h3>Historique</h3>
    </div>
    <div class="card-body">
      <MissionResumeHistoriqueElement :type="MissionHistorique.NOUVELLE_MISSION" :at="new Date()" :by="member"
        :content="'42adm-01'" />
      <MissionResumeHistoriqueElement :type="MissionHistorique.AJOUT_MEMBRE" :at="new Date()" :by="member"
        :content="'@tbelhomm'" />
      <MissionResumeHistoriqueElement :type="MissionHistorique.NOUVEAU_DOCUMENT" :at="new Date()" :by="member"
        :content="'test.pdf'" />
      <MissionResumeHistoriqueElement :type="MissionHistorique.NOUVELLE_VERSION" :at="new Date()" :by="member"
        :content="'test.pdf v2'" />
      <MissionResumeHistoriqueElement :type="MissionHistorique.SUPPRESSION_DOCUMENT" :at="new Date()" :by="member"
        :content="'test.pdf'" />
      <MissionResumeHistoriqueElement :type="MissionHistorique.RETRAIT_MEMBRE" :at="new Date()" :by="member"
        :content="'@tbelhomm'" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import MissionResumeHistoriqueElement from '@/components/mission/resume/MissionResumeHistoriqueElement.vue';
import type { MissionRowWithMemberListAndClient } from '@/domain/enums/Mission';
import { MissionHistorique } from '@/domain/enums/MissionHistorique';
import { type Member } from '@/stores/member';

const props = defineProps<{
  mission: MissionRowWithMemberListAndClient;
}>();

const member: Member = props.mission.members_type[0].member ?? {
  email: "test@test.com",
  id_user: "",
  name: "Test",
  phone: "",
  pseudo: "test",
  role: "president",
};
</script>

<style lang="scss" scoped>.card-historique {
  min-width: 250px;
}</style>