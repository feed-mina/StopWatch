<script setup>
import { ref, computed, inject } from 'vue';
import axios from "axios";
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
const isTimeVisible = inject('isTimeVisible');

const notyf = new Notyf();

const stopwatchSeconds = ref({
  time: 0
});


const running = ref(false);
let interval = null;

const formattedTime = computed(() => {
  const minutes = Math.floor(stopwatchSeconds.value.time / 6000);
  const seconds = Math.floor((stopwatchSeconds.value.time % 6000) / 100);
  const milliseconds = stopwatchSeconds.value.time % 100;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}.${milliseconds}`;
});

function startTimer() {
  running.value = true;
  if (!interval) {
    interval = setInterval(() => {
      stopwatchSeconds.value.time++;
    }, 1000);
  }
}

function stopTimer() {
  running.value = false;
  clearInterval(interval);
  interval = null;
}

function resetTimer() {
  stopTimer();
  stopwatchSeconds.value.time = 0;
}
//카카오톡으로 기록 보내기 함수
async function sendStopwatchTimeRecord() {
  
  if (!stopwatchSeconds.value.time) {
    notyf.error("보낼 기록이 없어요!");
    return;
  }
  try {
    const response = await axios.post("http://localhost:8080/api/kakao/sendRecord", {
      stopwatchTime: stopwatchSeconds.value.time,
    });
    console.log("전송 성공!", response.data);
    notyf.success("카카오톡으로 기록을 보냈어요!");
  } catch (error) {
    console.error("전송 실패!", error);
    notyf.error("전송에 실패했어요!");
  
    if (error.response) {
  if (error.response && error.response.status === 401) {
    const loginUrl = error.response.data;
    notyf.error("카카오 로그인이 필요해요! 로그인 페이지로 이동할게요.");
    window.location.href = loginUrl;  
    } else if (error.response.status === 500) {
      // ⭐ 환경 설정 문제 (clientId, redirectUri 문제)
      notyf.error("서버 환경설정 오류가 있어요. 관리자에게 알려주세요!");
    } else {
      notyf.error("알 수 없는 오류가 발생했어요.");
    }
  } else {
    notyf.error("서버 연결에 문제가 있어요.");
  }
}
}
</script>

<template>
  <div class="stopwatch">
    <h2>🕒 스탑워치</h2>
    <p>{{ formattedTime }}</p>
    <button @click="startTimer" v-if="!running">시작</button>
    <button @click="stopTimer" v-if="running">정지</button>
    <button @click="resetTimer">초기화</button>
  <div>
    <button v-if="isTimeVisible" @click="sendStopwatchTimeRecord">카카오톡으로 기록 보내기</button>

  </div>
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
