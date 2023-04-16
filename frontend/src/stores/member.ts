import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import { type Result, Err, Ok } from "@hqoss/monads";
import type { Database } from "@/types/database";
import { supabase } from "./supabase";
import type { PostgrestError } from "@supabase/supabase-js";

export const useMemberStore = defineStore("member", () => {
  const members: Ref<Result<
    Database["public"]["Tables"]["users_informations"]["Row"][],
    PostgrestError
  > | null> = ref(null);

  const fetchMembers = async () => {
    members.value = null;

    const response = await supabase.from("users_informations").select("*");
    if (response.error) {
      members.value = Err(response.error);
      return;
    }

    if (response.data) {
      members.value = Ok(response.data);
      return;
    }
  };

  return {
    members,
    fetchMembers,
  };
});
