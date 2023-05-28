import { defineStore } from "pinia";
import { ref } from "vue";
import { supabase } from "./supabase";
import type { Database } from "@/types/database";

export type Role = Database['public']['Tables']['roles']['Row'];

export const useRoleStore = defineStore("role", () => {
  const roles = ref<Role[]>([]);

  const fetchRoles = async (): Promise<Role[]> => {
    const roleDb = await supabase.from("roles").select("name, color, is_administration");
    if (roleDb.error) {
      console.error(roleDb.error);
    }
    if (roleDb.data) {
      roles.value = roleDb.data;
    }
    return roles.value;
  };

  return {
    roles,
    fetchRoles,
  };
});
