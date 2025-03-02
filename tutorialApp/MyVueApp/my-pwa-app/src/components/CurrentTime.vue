
<script setup>
import { ref, onMounted, watch } from 'vue';
    
    const currentTime = ref('');
    function updateTime(){
        const now = new Date();
        currentTime.value = now.toLocaleSring();
    }
  
    onMounted(() => {
        updateTime();
        setInterval(updateTime, 1000);
    });
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
  