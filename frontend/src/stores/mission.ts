import { ref, type Ref } from 'vue';
import { defineStore } from 'pinia';
import { supabase } from './supabase';
import type { Database } from '@/types/database';
import { useRoute } from 'vue-router';
import type { Member } from './member';

export type MissionRow = Database['public']['Tables']['missions']['Row'];
export type MissionIntervenantRow = Database['public']['Tables']['missions_intervenants']['Row'];
export type MissionRowWithMemberList = MissionRow & {
  members_type: (MissionIntervenantRow & {
    member: Member;
  })[];
};

export enum IntervenantType {
  CDP = 'cdp',
  Developpeur = 'developpeur'
}

export const useMissionStore = defineStore('missions', () => {
  const missions: Ref<MissionRow[] | undefined> = ref();
  const mission: Ref<MissionRowWithMemberList | undefined> = ref();

  function basicQuery() {
    return supabase.from('missions');
  }

  function basicSelectQuery() {
    return basicQuery().select(
      '*, members_type:missions_intervenants(*, member:users_informations(*))'
    );
  }

  async function fetchMissionById(
    id: number,
    force: boolean = false
  ): Promise<MissionRowWithMemberList> {
    if (mission.value && mission.value.id === id && !force) {
      return mission.value;
    }

    const missionDbResult = await basicSelectQuery()
      .eq('id', id)
      .maybeSingle<MissionRowWithMemberList>();
    if (missionDbResult.data) {
      mission.value = missionDbResult.data;
      return missionDbResult.data;
    }

    throw new Error('no data with this name');
  }

  async function fetchMissionByName(nom: string): Promise<MissionRowWithMemberList> {
    if (mission.value && mission.value.nom === nom) {
      return mission.value;
    }

    const missionDbResult = await basicSelectQuery()
      .eq('nom', nom)
      .maybeSingle<MissionRowWithMemberList>();
    if (missionDbResult.data) {
      mission.value = missionDbResult.data;
      return missionDbResult.data;
    }

    throw new Error('no data with this name');
  }

  async function fetchMissionFromUrl(): Promise<MissionRow> {
    return fetchMissionByName(useRoute().params.idMission as string);
  }

  async function fetchMissions(): Promise<Ref<MissionRow[] | undefined>> {
    const { data, error } = await basicQuery().select('*');
    if (error) throw error;
    if (!data) throw new Error('EmptyResponse');

    missions.value = data as MissionRow[];
    return missions;
  }

  async function editCdpForMission(
    idMission: number,
    idOldCdp: string | null,
    idNewCdp: string | null
  ): Promise<void> {
    if (idNewCdp) {
      await supabase.from('missions_intervenants').upsert(
        {
          id_mission: idMission,
          id_user: idNewCdp,
          type: IntervenantType.CDP
        },
        {
          onConflict: 'id_mission,id_user',
          ignoreDuplicates: false
        }
      );
    }
    if (idOldCdp) {
      await supabase
        .from('missions_intervenants')
        .delete()
        .eq('id_mission', idMission)
        .eq('id_user', idOldCdp);
    }

    await fetchMissionById(idMission, true);
  }

  return {
    missions,
    mission,
    fetchMissions,
    fetchMissionById,
    fetchMissionByName,
    fetchMissionFromUrl,
    editCdpForMission
  };
});
