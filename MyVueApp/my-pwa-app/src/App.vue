<script  setup>
   import LoginView from './components/LoginView.vue'
   import MainView from './components/MainView.vue'
   import { ref, onMounted, provide } from "vue";
   import axios from "axios";
   
    const stopwatchSeconds = ref(0);  // 스탑워치 시간 (초)
    const pomoSession = ref(0);       // 뽀모도로 횟수
    const kakaoToken = ref('');

provide("stopwatchSeconds", stopwatchSeconds);
provide("pomoSession", pomoSession);
       const isDarkMode = ref(false);
       const isTimeVisible = ref(false);
       const isLogin = ref(false);
   
    
        function handleLoginSuccess(token) {
          isLogin.value = true;
          kakaoToken.value = token;
          localStorage.setItem('isLogin', 'true');
          localStorage.setItem('kakaoAccessToken', token);
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
        kakaoToken.value = localStorage.getItem('kakaoAccessToken');
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

   <!-- <div class="app">
    // 로그인 안 했을 때
      <LoginView v-if="!isLogin" @loginSuccess="handleLoginSuccess" />
       // 로그인 성공했을 때
      <MainView class="mainView" v-else  @logout="handleLogout" />
   </div> -->

   <router-view></router-view>
</template>