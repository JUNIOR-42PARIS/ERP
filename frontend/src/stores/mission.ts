import { ref, type Ref } from "vue";
import { defineStore } from "pinia";
import { supabase } from "./supabase";
import type { Database } from "@/types/database";
import { useRoute } from "vue-router";

export type MissionRow = Database["public"]["Tables"]["missions"]["Row"];

export const useMissionStore = defineStore("missions", () => {
  const missions: Ref<MissionRow[] | undefined> = ref();
  const mission: Ref<MissionRow | undefined> = ref();

  async function fetchMission(nom: string): Promise<MissionRow> {
    if (mission.value && mission.value.nom === nom) {
      return mission.value;
    }

    const missionDbResult = await supabase
      .from("missions")
      .select("*")
      .limit(1);
    if (missionDbResult.data && missionDbResult.data.length === 1) {
      mission.value = missionDbResult.data[0];
      return missionDbResult.data[0];
    }

    throw new Error("no data with this name");
  }

  async function fetchMissionFromUrl(): Promise<MissionRow> {
    return fetchMission(useRoute().params.idMission as string);
  }

  async function fetchMissions(): Promise<Ref<MissionRow[] | undefined>> {
    const { data, error } = await supabase.from("missions").select("*");
    if (error) throw error;
    if (!data) throw new Error("EmptyResponse");

    missions.value = data as MissionRow[];
    return missions;
  }

  return { missions, fetchMissions, fetchMission, fetchMissionFromUrl };
});
