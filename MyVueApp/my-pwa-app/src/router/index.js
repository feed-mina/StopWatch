import { createRouter, createWebHistory } from 'vue-router'; 
import LoginView from '../components/LoginView.vue';
import MainView from '../components/MainView.vue';


const routes = [
  { path: '/', component: LoginView },
  { path: '/main', component: MainView },
];



const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;
