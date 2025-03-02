
<script>
export default {
  setuo() {
    
    const time = ref(0);
    const running = ref(false);
    let interval = null;

    const formattedTime = () => {
      const minutes = Math.floor(this.time / 6000);
      const seconds = Math.floor((this.time % 6000) / 100);
      const milliseconds = this.time % 100;
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}.${milliseconds}`;
    };
  
    const startTimer = () => {
      this.running = true;
      if (!this.interval) {
        this.interval = setInterval(() => {
          this.time++;
        }, 10);
      }
    };

    const stopTimer = () => {
      this.running = false;
      clearInterval(this.interval);
      this.interval = null;
    };
    
    const resetTimer = () => {
      this.running = false;
      this.time = 0;
      this.stopTimer();
    };

    
    return {
      time,
      running,
      formattedTime,
      startTimer,
      stopTimer,
      resetTimer
    };
  },
};
</script>
<template>
    <div class="stopwatch">
      <h2>🕒 스탑워치</h2>
      <p>{{ formattedTime }}</p>
      <button @click="startTimer" v-if="!running">시작</button>
      <button @click="stopTimer" v-if="running">정지</button>
      <button @click="resetTimer">초기화</button>
    </div>
  </template>
  
  <style scoped>
  .stopwatch {
    text-align: center;
  }
  button {
    margin: 5px;
  }
  </style>
  