
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
    <div class="currentTime">
    <h1>현재 시간</h1>
    <p>{{ currentTime }}</p>
  </div>
  </template>
  
  <style scoped>
  .currentTime {
    text-align: center;
  } 
h1 {
  font-size: 24px;
  color: #333;
}
p {
  font-size: 20px;
  color: #555;
}
  </style>
  