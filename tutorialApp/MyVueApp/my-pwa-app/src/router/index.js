import { createRouter, createWebHistory } from 'vue-router'; // <-- 문제 가능

const router = createRouter({
  history: createWebHistory(), // 🚨 이 부분이 문제일 가능성 있음!
  routes: [
    // { path: '/', component: () => import('../views/HomeView.vue') }
  ]
});

export default router;
