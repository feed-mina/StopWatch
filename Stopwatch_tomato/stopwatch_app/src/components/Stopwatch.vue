<template>
    <div class="stopwatch">
      <h2>스탑워치</h2>
      <p>{{ formattedTime }}</p>
      <button @click="startTimer">시작</button>
      <button @click="stopTimer">정지</button>
      <button @click="resetTimer">초기화</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        time: 0,
        interval: null
      };
    },
    computed: {
      formattedTime() {
        const minutes = Math.floor(this.time / 6000);
        const seconds = Math.floor((this.time % 6000) / 100);
        const milliseconds = this.time % 100;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}.${milliseconds}`;
      }
    },
    methods: {
      startTimer() {
        if (!this.interval) {
          this.interval = setInterval(() => {
            this.time++;
          }, 10);
        }
      },
      stopTimer() {
        clearInterval(this.interval);
        this.interval = null;
      },
      resetTimer() {
        this.time = 0;
        this.stopTimer();
      }
    }
  };
  </script>
  
  <style scoped>
  .stopwatch {
    text-align: center;
  }
  button {
    margin: 5px;
  }
  </style>
  