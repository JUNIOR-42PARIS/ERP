import { defineStore } from "pinia";
import { ref } from "vue";
import { supabase } from "./supabase";
import type { Database } from "@/types/database";

export type Member = Database['public']['Tables']['users_informations']['Row'];

export const useMemberStore = defineStore("member", () => {
  const members = ref<Member[]>([]);
  const editMember = ref<Member | null>(null);

  const fetchMembers = async (): Promise<Member[]> => {
    const users = await supabase.from("users_informations").select("id_user, name, email, phone, role");
    if (users.error) {
      console.error(users.error);
    }
    if (users.data) {
      members.value = users.data;
    }
    return members.value;
  };

  return {
    members,
    editMember,
    fetchMembers,
  };
});
