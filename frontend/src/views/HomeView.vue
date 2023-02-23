<template>
  <main v-if="!user">
    <button @click="login">Login</button>
  </main>
  <main v-else-if="user">
    <p>{{ user }}</p>
  </main>
</template>

<script setup lang="ts">
import router from '@/router';
import { supabase } from '@/stores/supabase';
import type { User } from '@supabase/supabase-js';
import { onMounted, ref, type Ref } from 'vue';

const user: Ref<undefined | User> = ref(undefined);

function login() {
  supabase.auth.signInWithOAuth({
    provider: "google"
  })
}

onMounted(async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error(error);
    router.push("/login");
    return;
  }
  user.value = data.user;
})

</script>

