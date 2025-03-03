<script  setup>
import LoginView from './components/LoginView.vue'
import MainView from './components/MainView.vue'
import CurrentTime from "./components/CurrentTime.vue"; 
import { ref, onMounted, provide } from "vue";
import axios from "axios";

    const isDarkMode = ref(false);
    const isTimeVisible = ref(false);
    const isLogin = ref(false);

    function handleLoginSuccess(){
      isLogin.value = true;
    };

//     function checkServerTime() {
//       axios.get('http://localhost:8080/api/timer/now')
//           .then(response => {
// //        console.log("서버 시간:", response.data);
//         isTimeVisible.value = true;  // 서버 연결 성공하면 보임
//     })
//     .catch(error => {
//       console.error(error);
//       isTimeVisible.value = false;  // 서버 안되면 숨김
//       // this.nowTime = new Date().toLocaleTimeString(); // 서버 안되면 현재 시간
//     });
// }

onMounted(() => {
  // checkServerTime();
  // setInterval(checkServerTime, 1000);  
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    isDarkMode.value = true;
    document.documentElement.classList.add("dark");
  }
});
// provide('isTimeVisible', isTimeVisible);
</script>

<template>
  <div class="app">
    <!-- 로그인 안 했을 때 -->
    <LoginView v-if="!isLogin" @loginSuccess="handleLoginSuccess" />

    <!-- 로그인 성공했을 때 -->
    <MainView v-else />
</div>
</template>

<style>
.app {
  text-align: center;
  margin-top: 50px;
}
.timer h2 {
  font-size: 48px;
}
button {
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
}
.notification {
  background-color: yellow;
  padding: 10px;
  margin-top: 20px;
}
</style>
