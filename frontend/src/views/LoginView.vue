<template>
  <main>
    <div class="login-box">
      <h1>Connexion à l'ERP</h1>
      <hr>
      <div @click="login" class="login-btn">
        <svg width="27" height="28" viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_247_206)">
            <path d="M13.7755 11.4546V16.8764H21.1893C20.8637 18.6201 19.8868 20.0965 18.4216 21.0892L22.8924 24.6147C25.4972 22.1712 27 18.582 27 14.3184C27 13.3256 26.9124 12.371 26.7495 11.4547L13.7755 11.4546Z" fill="#4285F4"/>
            <path d="M6.05527 16.6648L5.04694 17.4492L1.47775 20.2747C3.74446 24.8437 8.39024 28.0002 13.7752 28.0002C17.4945 28.0002 20.6128 26.7529 22.8921 24.6147L18.4213 21.0892C17.194 21.9292 15.6286 22.4384 13.7752 22.4384C10.1936 22.4384 7.15051 19.982 6.0609 16.6729L6.05527 16.6648Z" fill="#34A853"/>
            <path d="M1.47779 7.7255C0.538597 9.60907 0.000152588 11.7346 0.000152588 14C0.000152588 16.2654 0.538597 18.3909 1.47779 20.2745C1.47779 20.2871 6.06138 16.6599 6.06138 16.6599C5.78587 15.8199 5.62302 14.9291 5.62302 13.9999C5.62302 13.0706 5.78587 12.1798 6.06138 11.3398L1.47779 7.7255Z" fill="#FBBC05"/>
            <path d="M13.7755 5.57457C15.8043 5.57457 17.6076 6.28729 19.0478 7.66186L22.9926 3.6528C20.6006 1.38737 17.4949 0 13.7755 0C8.39053 0 3.74446 3.14365 1.47775 7.72551L6.0612 11.3401C7.15066 8.03093 10.1939 5.57457 13.7755 5.57457Z" fill="#EA4335"/>
          </g>
          <defs>
            <clipPath id="clip0_247_206">
              <rect width="27" height="28" fill="white"/>
            </clipPath>
          </defs>
        </svg>

        Se connecter avec
        
        <strong>Google</strong>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import router from '@/router';
import { supabase } from '@/stores/supabase';
import { onMounted } from 'vue';

function login() {
  supabase.auth.signInWithOAuth({
    provider: 'google'
  });
}

onMounted(async () => {
  try {
    const { data, error } = await supabase.auth.getUser();

    if (!error && data.user) {
      router.replace('/');
    }
  } catch (err) {
    //
  }
});
</script>

<style lang="scss" scoped>
@import '@/assets/variables.scss';

main {
  margin-left: 50%;
  width: 50%;
  min-height: 100vh;

  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;

  .login-box {
    padding: 32px 124px;
    background: $bg-white;
    text-align: center;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: flex-start;
    gap: 16px;

    h1 {
      font-size: 16px;
      font-weight: 700;
      color: $text-almost-black;
    }

    hr {
      width: 20%;
      height: 1px;
      background: #EEE;
      border: none;
    }

    .login-btn {
      background: $background-grey2;
      padding: 16px;
      border-radius: 3px;
      border: 1px solid #F6F6F6;
      font-size: 12px;

      cursor: pointer;

      svg {
        vertical-align: middle;
        margin-right: 16px
      }
    }
  }
}

strong {
  font-weight: bold;
}
</style>