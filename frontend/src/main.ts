import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEnvelope, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import {
  faMobileScreen as fasMobileScreen,
  faGear as fasGear,
  faPencil as fasPencil,
  faCheck as fasCheck,
} from '@fortawesome/free-solid-svg-icons';
import {
  faGithubAlt
} from "@fortawesome/free-brands-svg-icons";

import App from './App.vue';
import router from './router';

import './assets/base.scss';

const app = createApp(App);

library.add(faEnvelope, fasMobileScreen, fasGear, faPenToSquare, fasPencil, fasCheck, faGithubAlt);

app.use(createPinia());
app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
