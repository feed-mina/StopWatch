<template>
    <div class="pomodoro">
      <h2>뽀모도로 타이머</h2>
      <h3>뽀모도로 세션: {{ pomoSession }}</h3>
      <p>{{ formattedTime }}</p>
      <button @click="startPomodoro">시작</button>
      <button @click="stopPomodoro">정지</button>
      <button @click="resetPomodoro">초기화</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        time: 25 * 60, // 25분
        pomoSession: 0,
        interval: null
      };
    },
    computed: {
      formattedTime() {
        const minutes = Math.floor(this.time / 60);
        const seconds = this.time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      }
    },
    methods: {
      startPomodoro() {
        this.pomoSession++;
        this.resetTimer();
        if (!this.interval) {
          this.interval = setInterval(() => {
            if (this.pomodoroSeconds > 0) {
              this.pomodoroSeconds--;
            } else {
              this.stopPomodoro();
              alert("뽀모도로 타이머 종료!");
            }
          }, 1000);
        }
      },
      stopPomodoro() {
        clearInterval(this.interval);
        this.interval = null;
      },
      resetPomodoro() {
        this.pomodoroSeconds = 25 * 60;
        this.stopPomodoro();
      }
    }
  };
  </script>
  
  <style scoped>
  .pomodoro {
    text-align: center;
  }
  button {
    margin: 5px;
  }
  </style>
  