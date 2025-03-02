
<script  setup>
import Stopwatch from "./components/Stopwatch.vue";
import PomodoroTimer from "./components/PomodoroTimer.vue"; 
import CurrentTime from "./components/CurrentTime.vue"; 
import { ref } from "vue";
    const isDarkMode = ref(false);

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
</script>

<template>
  <div class="app">
  <currentTime/>

    <h1>🕒 스탑워치 & 뽀모도로</h1>

    <!-- 스탑워치 -->
    <Stopwatch />
    <!-- 뽀모도로 -->
    <PomodoroTimer />

    <!-- 다크 모드 -->
    <div :class="{ 'dark': isDarkMode }">
      <div class="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-6">
        <button @click="toggleDarkMode" class="p-2 bg-gray-300 dark:bg-gray-700 rounded">
          {{ isDarkMode ? "🌞 라이트 모드" : "🌙 다크 모드" }}
        </button>
      </div>
    </div>

    <!--알림-->
    <div v-if="showNotification" class="notification">
      알림이 떴어요!
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
