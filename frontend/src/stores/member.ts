import { defineStore } from "pinia";
import { ref } from "vue";
import { supabase } from "./supabase";
import type { Database } from "@/types/database";

export type Member = Database['public']['Tables']['users_informations']['Row'];

export const useMemberStore = defineStore("member", () => {
  const members = ref<Member[]>([]);
  const editingMember = ref<Member | null>(null);

  const fetchMembers = async (): Promise<Member[]> => {
    members.value = [];
    const users = await supabase.from("users_informations").select("id_user, name, email, phone, role");
    if (users.error) {
      console.error(users.error);
    }
    if (users.data) {
      members.value = users.data;
    }
    return members.value;
  };

  const editMember = async (idUser: string, values: Partial<Omit<Member, "id_user">>): Promise<void> => {
    await supabase.from("users_informations").update(values).eq("id_user", idUser);
  };

  return {
    members,
    editingMember,
    fetchMembers,
    editMember,
  };
});
