
<script>
import Stopwatch from "./components/Stopwatch.vue";
import PomodoroTimer from "./components/PomodoroTimer.vue"; 
import { ref } from "vue";
export default {
  components: {
    Stopwatch,
    PomodoroTimer
  },
  setup() {
   const showNotification = ref(false);

      const showAlert = () => {
        showNotification.value = true;
        setTimeout(() => {
          showNotification.value = false;
        }, 3000);
      };
    const isDarkMode = ref(false);

    const toggleDarkMode = () => {
      isDarkMode.value = !isDarkMode.value;
      document.documentElement.classList.toggle("dark", isDarkMode.value);
    };

    const formattedTime= () => {
      let min = Math.floor(this.time / 60);
      let sec = this.time % 60;
      return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    }
    const startTimer= () => {
      this.running = true;
      this.interval = setInterval(() => {
        this.time++;
      }, 1000);
    };
    const stopTimer= () => {
      this.running = false;
      clearInterval(this.interval);
    };
    const resetTimer= () => {
      this.running = false;
      clearInterval(this.interval);
      this.time = 0;
    };

  const  startPomodoro = ()=> {
      this.resetTimer();
      this.pomoSession++;
      this.startTimer();
      setTimeout(() => {
        this.stopTimer();
        alert("뽀모도로 세션 종료!");
      }, 25 * 60 * 1000); // 25분 타이머
    };
    return {
      formattedTime,
      startTimer,
      stopTimer,
      resetTimer,
      startPomodoro, 
      isDarkMode, 
      toggleDarkMode ,
    };
  },
};
</script>

<template>
  <div class="app">
    <h1>🕒 스탑워치 & 뽀모도로</h1>
    <!--
    
    <div class="timer">
      <h2>{{ formattedTime }}</h2>
      <button @click="startTimer" v-if="!running">시작</button>
      <button @click="stopTimer" v-if="running">정지</button>
      <button @click="resetTimer">초기화</button>
    </div>

    <div class="pomo">
      <h3>뽀모도로 세션: {{ pomoSession }}</h3>
      <button @click="startPomodoro">뽀모도로 시작</button>
    </div>
    -->
    <Stopwatch />
    <PomodoroTimer />

    <div :class="{ 'dark': isDarkMode }">
      <div class="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-6">
        <button @click="toggleDarkMode" class="p-2 bg-gray-300 dark:bg-gray-700 rounded">
          {{ isDarkMode ? "🌞 라이트 모드" : "🌙 다크 모드" }}
        </button>
      </div>
    </div>
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
</style>
