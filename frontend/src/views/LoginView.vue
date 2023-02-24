<template>
  <main>
    <button @click="login">Login</button>
  </main>
</template>

<script setup lang="ts">
import router from '@/router';
import { supabase } from '@/stores/supabase';
import { onMounted } from 'vue';

function login() {
  supabase.auth.signInWithOAuth({
    provider: "google"
  })
}

onMounted(async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    
    if (!error && data.user) {
      router.replace("/");
    }
  } catch (err) {
    //
  }
})
</script>

