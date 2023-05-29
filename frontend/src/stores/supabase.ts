import type { Database } from '@/types/database';
import { createClient, type User } from '@supabase/supabase-js';
import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export const useUserStore = defineStore('user', () => {
  const user: Ref<undefined | User> = ref(undefined);
  const isAdmin: Ref<boolean> = ref(false);
  const isMember: Ref<boolean> = ref(false);

  async function setUser(new_user: User) {
    user.value = new_user;

    const { data: data_is_admin } = await supabase.rpc('is_user_admin', {
      user_id: new_user.id
    });
    isAdmin.value = data_is_admin === true;

    const { data: data_is_member } = await supabase.rpc('is_user_member', {
      user_id: new_user.id
    });
    isMember.value = data_is_member === true;
  }

  async function logout() {
    user.value = undefined;
    isAdmin.value = false;
    await supabase.auth.signOut();
  }

  return { user, isAdmin, isMember, setUser, logout };
});
