<script  setup>
import Stopwatch from "./Stopwatch.vue";
import PomodoroTimer from "./PomodoroTimer.vue"; 
import CurrentTime from "./CurrentTime.vue"; 
import { ref, onMounted, provide } from "vue";
import axios from "axios";

    const isDarkMode = ref(false);
    const isTimeVisible = ref(false);

    function checkServerTime() {
      axios.get('http://localhost:8080/api/timer/now')
          .then(response => {
//        console.log("서버 시간:", response.data);
        isTimeVisible.value = true;  // 서버 연결 성공하면 보임
    })
    .catch(error => {
      console.error(error);
      isTimeVisible.value = false;  // 서버 안되면 숨김
      // this.nowTime = new Date().toLocaleTimeString(); // 서버 안되면 현재 시간
    });
}

    const toggleDarkMode = () => {
      isDarkMode.value = !isDarkMode.value;
      document.documentElement.classList.toggle("dark", isDarkMode.value);
    };

    const showNotification = ref(false);

    const showAlert = () => {
      showNotification.value = true;
      setTimeout(() => {
        showNotification.value = false;
      }, 3000);
    };

onMounted(() => {
  checkServerTime();
  // setInterval(checkServerTime, 1000);  
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    isDarkMode.value = true;
    document.documentElement.classList.add("dark");
  }
});
provide('isTimeVisible', isTimeVisible);
</script>

<template>
  <div class="mainView"> 
  <CurrentTime/>
    <h1>🕒 스탑워치 & 뽀모도로</h1>
    <!-- 스탑워치 -->
    <Stopwatch />
    <!-- 뽀모도로 -->
    <PomodoroTimer /> 

    <!-- 다크모드 버튼 -->
    <button @click="toggleDarkMode" class="p-2 bg-gray-300 dark:bg-gray-700 rounded">
      {{ isDarkMode ? "🌞 라이트 모드" : "🌙 다크 모드" }}
    </button>

    <!--알림-->
    <div v-if="showNotification" class="notification">
      알림이 떴어요!
  </div>
</div>
</template>

<style>
.mainView {
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
