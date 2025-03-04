import './assets/index.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import './registerServiceWorker'; // PWA 기능 추가!
import LoginView from './components/LoginView.vue';
// createApp(App).mount('#app')

// createApp(LoginView).mount('#app');

createApp(App).use(router).mount('#app');