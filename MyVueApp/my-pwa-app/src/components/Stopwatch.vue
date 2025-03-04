<script setup>
import { ref, computed, inject } from 'vue';
import axios from "axios";
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import alarmSound from "/src/assets/alarm.wav";
import toySound from "/src/assets/toy.mp3";
import birdSound from "/src/assets/bird.mp3";

const kakaoToken = localStorage.getItem('kakaoAccessToken');
const isTimeVisible = inject('isTimeVisible');

const Pomoalarm = new Audio(alarmSound);
const Toyalarm = new Audio(toySound);
const birdalarm = new Audio(birdSound);

const notyf = new Notyf();

const stopwatchSeconds = inject('stopwatchSeconds');

const running = ref(false);
let interval = null;

const formattedTime = computed(() => {
  const totalTime = stopwatchSeconds.value;
  const hours = Math.floor(totalTime / 3600);
  const minutes = Math.floor((totalTime % 3600) / 60);
  const seconds = totalTime % 60;

  return `${hours < 10 ? '0' : ''}${hours}:` +
         `${minutes < 10 ? '0' : ''}${minutes}:` +
         `${seconds < 10 ? '0' : ''}${seconds}`;
});

function startTimer() {
  running.value = true;
  if (!interval) {
    interval = setInterval(() => {
      stopwatchSeconds.value++;
    }, 1000);
    setTimeout(() => {
      Pomoalarm.play();
    }, 10000);
  }
}

function stopTimer() {
  running.value = false;
  clearInterval(interval);
  interval = null;
  setTimeout(() => {
    Toyalarm.play();
  }, 5000);
}

function resetTimer() {
  stopwatchSeconds.value = 0;
}

async function sendStopwatchTimeRecord() {
  if (!stopwatchSeconds.value) {
    notyf.error("보낼 기록이 없어요!");
    return;
  }
  if (!kakaoToken) {
    notyf.error("로그인을 먼저 해주세요!");
    localStorage.clear();
    return;
  }
  try {
    const response = await axios.post("http://localhost:8080/api/kakao/sendRecord",
      { stopwatchTime: stopwatchSeconds.value },
      {
        headers: {
          'Authorization': 'Bearer ' + kakaoToken,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log("전송 성공!", response.data);
    notyf.success("카카오톡으로 기록을 보냈어요!");
  } catch (error) {
    console.error("전송 실패!", error);
    notyf.error("전송에 실패했어요!");
    if (error.response) {
      if (error.response.status === 401) {
        const loginUrl = error.response.data;
        notyf.error("카카오 로그인이 필요해요! 로그인 페이지로 이동할게요.");
        window.location.href = loginUrl;
      } else if (error.response.status === 500) {
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
    <div v-if="stopwatchSeconds> 0">
      <h2 class="formattedTime">{{ formattedTime }}</h2>
    </div>
    <div v-else>
      <h2 class="formattedTime">00:00:00</h2>
    </div>
    <button class="stopwatchButton" @click="startTimer" v-if="!running">시작</button>
    <button class="stopwatchButton" @click="stopTimer" v-if="running">정지</button>
    <button class="stopwatchButton" @click="resetTimer" v-if="stopwatchSeconds>  0">초기화</button>
  </div>
</template>
