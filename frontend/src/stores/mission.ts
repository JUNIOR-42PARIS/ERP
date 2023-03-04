import { ref, type Ref } from 'vue';
import { defineStore } from 'pinia';
import { supabase } from './supabase';
import type { Database } from '@/types/database';

export type MissionRow = Database['public']['Tables']['missions']['Row']

export const useMissionStore = defineStore('missions', () => {
  const missions: Ref<MissionRow[] | undefined> = ref(undefined);

  async function fetchMissions(): Promise<Ref<MissionRow[] | undefined>> {
    const { data, error } = await supabase.from('missions').select('*');
    if (error) throw error;
    if (!data) throw new Error("EmptyResponse");
    
    missions.value = data as MissionRow[];
    return missions;
  }

  return { missions, fetchMissions };
});
