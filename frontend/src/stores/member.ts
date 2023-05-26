import { defineStore } from "pinia";
import { ref } from "vue";
import { supabase } from "./supabase";
import type { Database } from "@/types/database";

export type Member = Database['public']['Tables']['users_informations']['Row'];

function isList<T>(v: T | T[]): v is T[] {
  return v instanceof Array;
}

export const useMemberStore = defineStore("member", () => {
  const members = ref<Member[]>([]);

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
    fetchMembers,
  };
});
