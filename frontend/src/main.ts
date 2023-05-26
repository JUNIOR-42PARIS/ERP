import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faMobileScreen } from "@fortawesome/free-solid-svg-icons";

import App from './App.vue';
import router from './router';

import './assets/base.scss';

const app = createApp(App);

library.add(faEnvelope, faMobileScreen);

app.use(createPinia());
app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app');
