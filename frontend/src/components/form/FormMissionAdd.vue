<template>
  <form @submit.prevent="() => createMission()">
    <div class="form-container">
      <div class="form-checkbox">
        <input type="checkbox" id="existing_client" v-model="existingClient">
        <label for="existing_client">Client existant ?</label>
      </div>

      <section>
        <h3>Client</h3>
        
        <div v-if="existingClient">
          <Multiselect
            v-model="mission.client"
            :options="clients.map((client) => client.nom)"
            :searchable="true"
            track-by="nom"
          >
          </Multiselect>
        </div>
        <div v-else>
          <div class="form-row">
            <TextInput :icon="FileIcon" name="client_name" label="Nom de la société" v-model="client.nom" :required="true" />
          </div>
          <div class="form-row">
            <TextInput :icon="FileIcon" name="client_adresse" label="Adresse" v-model="client.adresse" :required="true" />
          </div>
          <div class="form-row">
            <TextInput :icon="FileIcon" name="client_siret" label="SIRET" v-model="client.siret" />
          </div>
          <div class="form-row">
            <TextInput :icon="FileIcon" name="client_numero_tva" label="Numéro de TVA" v-model="client.numero_tva" />
          </div>
        </div>
      </section>
      
      <section>
        <h3>Prospect/Mission</h3>
        
        <div class="form-row">
          <TextInput :icon="FileIcon" name="mission_nom" label="Nom de la mission" v-model="missionName"/>
        </div>
        <div class="form-row">
          <TextInput :icon="FileIcon" name="mission_description" label="Description" v-model="mission.description" :required="true" />
        </div>
        <div class="form-row">
          <TextInput :icon="FileIcon" name="mission_nom_intermediaire" label="Prénom Nom de l'intermédiaire" v-model="mission.nom_intermediaire"/>
        </div>
        <div class="form-row">
          <TextInput :icon="FileIcon" name="mission_email_intermediaire" label="Email de l'intermédiaire" v-model="mission.email_intermediaire"/>
        </div>
        <div class="form-row">
          <TextInput :icon="FileIcon" name="mission_telephone_intermediaire" label="Téléphone de l'intermédiaire" v-model="mission.telephone_intermediaire"/>
        </div>
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
import FileIcon from "@/components/shared/icons/FileIcon.vue";
import TextInput from "../shared/form/TextInput.vue";
import { computed, onMounted, ref, type Ref } from "vue";
import type { Database } from "@/types/database";
import MissionStatus from "@/types/missionStatus";
import Multiselect from 'vue-multiselect';
import "vue-multiselect/dist/vue-multiselect.css";
import { useMissionStore } from "@/stores/mission";

const userStore = useUserStore();
const formStore = useFormStore();

const existingClient = ref(false);

let clients: Database["public"]["Tables"]["clients"]["Row"][] = [];

const client: Ref<Database["public"]["Tables"]["clients"]["Insert"]> = ref({
  adresse: "",
  nom: "",
  numero_tva: "",
  siret: "",
});

const mission = ref({
  nom: "",
  client: client.value.nom,
  created_by: userStore.user?.id,
  description: "",
  status: MissionStatus.prospect,
  nom_intermediaire: "",
  email_intermediaire: "",
  telephone_intermediaire: "",
});

const numeroMission = 1;

onMounted(async () => {
  loadClients();
});

const missionName = computed({
  set: (value: string) => {
    mission.value.nom = value;
  },
  get: () => {
    if (mission.value.nom.length === 0) {
      let clientName: string;
      if (existingClient.value)
        clientName = mission.value.client;
      else
        clientName = client.value.nom;

      return `${clientName}-${String(numeroMission).padStart(2, '0')}`;
    } else {
      return mission.value.nom;
    }
  }
});

async function loadClients() {
  const { data, error } = await supabase.from("clients").select("*");

  if (error) {
    console.error(error);
    return;
  }
  clients = data as Database["public"]["Tables"]["clients"]["Row"][];
  console.log(clients);
}

async function createClient(): Promise<boolean> {
  const { error } = await supabase
    .from('clients')
    .insert([
      {
        ...client.value,
        numero_tva: client.value.numero_tva ?? undefined,
        siret: client.value.siret ?? undefined,
      }
    ]);
  if (error) {
    console.error(error);
    return false;
  }
  return true;
}

async function createMission() {
  if (!existingClient.value) {
    const isClientCreated = await createClient();
    if (!isClientCreated) {
      /** @todo Erreur à afficher ici */
      return;
    }
    mission.value.client = client.value.nom;
  }

  const { error } = await supabase
    .from('missions')
    .insert([
      mission.value,
    ]);
  if (error) {
    console.log(error);
    return;
  }

  await useMissionStore().fetchMissions();

  formStore.closeForm();
  return;
}
</script>
