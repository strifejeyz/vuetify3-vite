/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

import App from './App.vue';
import {createApp} from 'vue';
import '@/styles/globals.scss';
import Store from "./state/store";
import Server from "@/plugins/Server";
import "animator-css/animator.css";
import {registerPlugins} from '@/plugins';

const app = createApp(App);
app.config.globalProperties.$axios = Server;
registerPlugins(app);
app.use(Store);
app.mount('#ai-lease-calculator');
