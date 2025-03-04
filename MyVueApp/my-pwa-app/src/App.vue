<script  setup>
   import LoginView from './components/LoginView.vue'
   import MainView from './components/MainView.vue'
   import { ref, onMounted, provide } from "vue";
   import axios from "axios";
   
const stopwatchSeconds = ref(0);  // 스탑워치 시간 (초)
const pomoSession = ref(0);       // 뽀모도로 횟수

provide("stopwatchSeconds", stopwatchSeconds);
provide("pomoSession", pomoSession);
       const isDarkMode = ref(false);
       const isTimeVisible = ref(false);
       const isLogin = ref(false);
   
       function handleLoginSuccess(){
         isLogin.value = true;
         localStorage.setItem("isLogin", "true");
       }; 
       function handleLogout() {
         isLogin.value = false;
         localStorage.removeItem("isLogin");
         isDarkMode.value = false;
         document.documentElement.classList.remove("dark");
       }
   onMounted(() => {
     if (localStorage.getItem("isLogin") === "true") {
       isLogin.value = true;
     }
    
     if (!isLogin.value) {
       isDarkMode.value = false;
       document.documentElement.classList.remove("dark");
     } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
       isDarkMode.value = true;
       document.documentElement.classList.add("dark");
     }
   });
</script>
<template>
   <div class="app">
      <!-- 로그인 안 했을 때 -->
      <LoginView v-if="!isLogin" @loginSuccess="handleLoginSuccess" />
      <!-- 로그인 성공했을 때 -->
      <MainView class="mainView" v-else  @logout="handleLogout" />
   </div>
</template>