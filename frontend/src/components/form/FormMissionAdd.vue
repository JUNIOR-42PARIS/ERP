<template>
  <form @submit.prevent="() => createMission()">
    <div class="form-container">
      <div class="form-row form-checkbox">
        <input type="checkbox" name="" id="" checked>
        <label for="exisiting_client">Client existant ?</label>
      </div>

      <section>
        <h3>Client</h3>
        <input type="text">
      </section>
    </div>
    <div class="form-footer">
      <button class="btn grey" @click="() => formStore.closeForm()">Annuler</button>
      <button type="submit" class="btn">Créer</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useFormStore } from "@/stores/form";
import { supabase, useUserStore } from "@/stores/supabase";

const userStore = useUserStore();
const formStore = useFormStore();

async function createMission() {
  const { data, error } = await supabase
    .from('missions')
    .insert([
      { numero_mission: 1, description: "test", created_by: userStore.user?.id },
    ])
  if (error) {
    console.log(error)
    return;
  }
  console.log(data)
  formStore.closeForm();
  return;
}
</script>
