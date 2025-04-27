import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';

// Création de l'app
const app = createApp(App);

// On ajoute axios en global
app.config.globalProperties.$http = axios;

// On utilise le router
app.use(router);

// Et on monte l'app
app.mount('#app');