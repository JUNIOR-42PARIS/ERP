import { createClient, type User } from '@supabase/supabase-js';
import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

export const useUserStore = defineStore('user', () => {
  const user: Ref<undefined | User> = ref(undefined);
  const is_admin: Ref<boolean> = ref(false);

  async function setUser(new_user: User) {
    user.value = new_user;

    const { data: data_is_admin } = await supabase.rpc('is_user_admin', {
      user_id: new_user.id
    });
    is_admin.value = data_is_admin === true;
  }

  async function logout() {
    user.value = undefined;
    is_admin.value = false;
    await supabase.auth.signOut();
  }

  return { user, is_admin, setUser, logout };
});
