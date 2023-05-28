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
            <TextInput :icon="UserIcon" name="client_name" label="Nom de la société" v-model="client.nom" :validation="isNameTextLengthValid()" :required="true" />
          </div>
          <div class="form-row">
            <TextInput :icon="HomeIcon" name="client_adresse" label="Adresse" v-model="client.adresse" :validation="isNameTextLengthValid(1, 250)" :required="true" />
          </div>
          <div class="form-row">
            <TextInput :icon="EntrepriseIcon" name="client_siret" label="SIRET" v-model="client.siret" :validation="isValidSiren(true)" />
          </div>
          <div class="form-row">
            <TextInput :icon="EuroIcon" name="client_numero_tva" label="Numéro de TVA" v-model="client.numero_tva" />
          </div>
        </div>
      </section>
      
      <section>
        <h3>Prospect/Mission</h3>
        
        <div class="form-row">
          <TextInput :icon="HashtagIcon" name="mission_nom" label="Nom de la mission" v-model="missionName" :required="true"/>
        </div>
        <div class="form-row">
          <TextInput :icon="FileIcon" name="mission_description" label="Description" v-model="mission.description" :validation="isNameTextLengthValid(1, 2000)" :required="true" />
        </div>
        <div class="form-row">
          <TextInput :icon="UserIcon" name="mission_nom_intermediaire" label="Prénom Nom de l'intermédiaire" v-model="mission.nom_intermediaire"  :validation="isNameTextLengthValid()"/>
        </div>
        <div class="form-row">
          <TextInput :icon="EmailIcon" name="mission_email_intermediaire" label="Email de l'intermédiaire" v-model="mission.email_intermediaire"  :validation="isNameTextLengthValid()"/>
        </div>
        <div class="form-row">
          <TextInput :icon="PhoneIcon" name="mission_telephone_intermediaire" label="Téléphone de l'intermédiaire" v-model="mission.telephone_intermediaire"  :validation="isNameTextLengthValid(0, 10)"/>
        </div>
      </section>
    </div>
    <div class="form-footer">
      <button class="btn grey" @click="() => emits('close')">Annuler</button>
      <button type="submit" class="btn">Créer</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { supabase, useUserStore } from "@/stores/supabase";
import FileIcon from "@/components/shared/icons/FileIcon.vue";
import TextInput from "../shared/form/TextInput.vue";
import { computed, onMounted, ref, type Ref } from "vue";
import type { Database } from "@/types/database";
import MissionStatus from "@/types/missionStatus";
import Multiselect from 'vue-multiselect';
import "vue-multiselect/dist/vue-multiselect.css";
import { useMissionStore } from "@/stores/mission";
import { isNameTextLengthValid, isValidSiren } from "@/utils/validation";
import { ToastType, useToasterStore } from "@/stores/toaster";
import { objectEmptyStringToNull } from "@/utils/string";
import UserIcon from "@/components/shared/icons/UserIcon.vue";
import HomeIcon from "@/components/shared/icons/HomeIcon.vue";
import EntrepriseIcon from "@/components/shared/icons/EntrepriseIcon.vue";
import EuroIcon from "@/components/shared/icons/EuroIcon.vue";
import HashtagIcon from "@/components/shared/icons/HashtagIcon.vue";
import EmailIcon from "@/components/shared/icons/EmailIcon.vue";
import PhoneIcon from "@/components/shared/icons/PhoneIcon.vue";

const emits = defineEmits<{
  (e: 'close'): void;
}>();

const userStore = useUserStore();

const existingClient = ref(false);

let clients: Database["public"]["Tables"]["clients"]["Row"][] = [];

const client: Ref<Database["public"]["Tables"]["clients"]["Insert"]> = ref({
  adresse: "",
  nom: "",
  numero_tva: "",
  siret: "",
});

const mission: Ref<Database["public"]["Tables"]["missions"]["Insert"]> = ref({
  nom: "",
  client: client.value.nom,
  created_by: userStore.user?.id ?? "",
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

      if (clientName === "")
        return "";

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
    .insert([objectEmptyStringToNull(client.value)]);
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
      useToasterStore().addToast("Une erreur est survenue à la création du client.", ToastType.error);
      return;
    }
    mission.value.client = client.value.nom;
    
    await loadClients();
    existingClient.value = true;
  }

  const { error } = await supabase
    .from('missions')
    .insert([
      objectEmptyStringToNull({
        ...mission.value,
        nom: missionName.value,
      }),
    ]);
  if (error) {
    console.log(error);
    useToasterStore().addToast(`Une erreur est survenue à la création de la mission: ${error.message}`, ToastType.error);
    return;
  }

  await useMissionStore().fetchMissions();

  emits('close');
  return;
}
</script>
