<template>
  <div class="app">
    <h1>🕒 스탑워치 & 뽀모도로</h1>
    
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: 0,
      running: false,
      pomoSession: 0,
      interval: null
    };
  },
  computed: {
    formattedTime() {
      let min = Math.floor(this.time / 60);
      let sec = this.time % 60;
      return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    }
  },
  methods: {
    startTimer() {
      this.running = true;
      this.interval = setInterval(() => {
        this.time++;
      }, 1000);
    },
    stopTimer() {
      this.running = false;
      clearInterval(this.interval);
    },
    resetTimer() {
      this.running = false;
      clearInterval(this.interval);
      this.time = 0;
    },
    startPomodoro() {
      this.resetTimer();
      this.pomoSession++;
      this.startTimer();
      setTimeout(() => {
        this.stopTimer();
        alert("뽀모도로 세션 종료!");
      }, 25 * 60 * 1000); // 25분 타이머
    }
  }
};
</script>

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
