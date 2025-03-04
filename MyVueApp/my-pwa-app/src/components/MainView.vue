<script  setup>
import { inject } from "vue";
   import Stopwatch from "./Stopwatch.vue";
   import PomodoroTimer from "./PomodoroTimer.vue"; 
   import CurrentTime from "./CurrentTime.vue"; 
   import { ref, onMounted, provide } from "vue";
   import axios from "axios";
   
       const isDarkMode = ref(false);
       const isTimeVisible = ref(false);
       const stopwatchSeconds = inject('stopwatchSeconds');
const pomoSession = inject('pomoSession');
const kakaoToken = localStorage.getItem('kakaoAccessToken');

   
       function checkServerTime() {
         axios.get('http://localhost:8080/api/timer/now')
             .then(response => {
   //        console.log("서버 시간:", response.data);
           isTimeVisible.value = true;  // 서버 연결 성공하면 보임
       })
       .catch(error => {
         console.error(error);
         isTimeVisible.value = false;  // 서버 안되면 숨김
         // this.nowTime = new Date().toLocaleTimeString(); // 서버 안되면 현재 시간
       });
   }
   

async function sendAllRecords() {
  console.log("카카오톡으로 기록 보냅니다!");
  if (!kakaoToken) {
    notyf.error("로그인을 먼저 해주세요!");
    return;
  }
  if (!stopwatchSeconds.value && !pomoSession.value) {
    notyf.error("보낼 기록이 없어요!");
    return;
  }

  try {
    const response = await axios.post("http://localhost:8080/api/kakao/sendRecord", {
      stopwatchTime: stopwatchSeconds.value,        // 스탑워치 시간(초)
      pomodoroCount: pomoSession.value,            // 뽀모도로 횟수
      pomodoroTotalTime: pomoSession.value * 25,   // 뽀모도로 총 시간 (분)
    }, {
      headers: {
        'Authorization': 'Bearer ' + kakaoToken,
        'Content-Type': 'application/json',
      },
    });

    console.log("전송 성공!", response.data);
    notyf.success("카카오톡으로 기록을 보냈어요!");

  } catch (error) {
    console.error("전송 실패!", error);
    notyf.error("전송에 실패했어요!");
  }
}
       const toggleDarkMode = () => {
         isDarkMode.value = !isDarkMode.value;
         document.documentElement.classList.toggle("dark", isDarkMode.value);
       };
   
       const showNotification = ref(false);
       const kakaoButtonEnabled = ref(false);

       async function checkServer() {
  try {
    const response = await fetch('http://localhost:8080/health'); // 헬스 체크용 엔드포인트
    if (response.ok) {
      kakaoButtonEnabled.value = true; // 버튼 활성화
    } else {
      kakaoButtonEnabled.value = false; // 버튼 비활성화
    }
  } catch (error) {
    kakaoButtonEnabled.value = false; // 서버 연결 안되면 비활성화
  }
}
}

       const showAlert = () => {
         showNotification.value = true;
         setTimeout(() => {
           showNotification.value = false;
         }, 3000);
       };
   
   onMounted(() => {
    checkServer();
     checkServerTime();
     // setInterval(checkServerTime, 1000);  
     if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
       isDarkMode.value = true;
       document.documentElement.classList.add("dark");
     }
   });
   provide('isTimeVisible', isTimeVisible);
</script>
<template>
   <div class="mainView">
      <CurrentTime/>
      <h1>🕒 스탑워치 & 뽀모도로</h1>
      <!-- 스탑워치 -->
      <Stopwatch />
      <!-- 뽀모도로 -->
      <PomodoroTimer />
<div>
  <button class="kakaosendbutton" @click="sendAllRecords" :disabled="!kakaoButtonEnabled">카카오톡으로 기록 보내기</button>

</div>
      <!-- 다크모드 버튼 -->
      <button @click="toggleDarkMode" class="toggleMode" >
      {{ isDarkMode ? "🌞 라이트 모드" : "🌙 다크 모드" }}
      </button>
      <!--알림-->
      <div v-if="showNotification" class="notification">
         알림이 떴어요!
      </div>
   </div>
</template>