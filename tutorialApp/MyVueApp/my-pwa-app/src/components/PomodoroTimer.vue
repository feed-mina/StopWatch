<script setup>
import { ref, computed, inject } from "vue";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
const isTimeVisible = inject('isTimeVisible');
    // 알림 라이브러리 설정
    const notyf = new Notyf();

    // 뽀모도로 관련 상태 변수
    const pomoSession = ref(0);
    const pomodoroSeconds = ref(25 * 60); // 25분
    let interval = null;

    // 시간 포맷팅 (MM:SS)
    const formattedTime = computed(() => {
      const minutes = Math.floor(pomodoroSeconds.value / 60);
      const seconds = pomodoroSeconds.value % 60;
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    });

    // 뽀모도로 시작
    function startPomodoro(){
      pomoSession.value++;
      if (!interval) {
        interval = setInterval(() => {
          if (pomodoroSeconds.value > 0) {
            pomodoroSeconds.value--;
          } else {
            stopPomodoro();
            notyf.success("뽀모도로 완료!");
          }
        }, 1000);
      }
    };

    // 뽀모도로 정지
    function stopPomodoro(){
      clearInterval(interval);
      interval = null;
    };

    // 초기화 (25분으로 리셋)
    function resetPomodoro () {
      pomodoroSeconds.value = 25 * 60;
      stopPomodoro();
    };

    // 5분 휴식 시작
    function startBreak(){
      // stopPomodoro();
      pomodoroSeconds.value = 5 * 60; // 5분 휴식
      if (!interval) {
        interval = setInterval(() => {
          if (pomodoroSeconds.value > 0) {
            pomodoroSeconds.value--;
          } else {
            stopPomodoro();
            notyf.success("5분 휴식 종료!");
          }
        }, 1000);
      }
    };
 
//   카카오톡으로 기록 보내기 함수
async function sendPomodoroTimerRecord() {
  if (!pomoSession.value) {
    notyf.error("보낼 기록이 없어요!");
    return;
  }
  try {
    const response = await axios.post("http://localhost:8080/api/kakao/sendRecord", {
      pomodoroCount: pomoSession.value,
      pomodoroTotalTime: pomodoroSeconds.value,
    });
    console.log("전송 성공!", response.data);
    notyf.success("카카오톡으로 기록을 보냈어요!");
  } catch (error) {
    console.error("전송 실패!", error);
    notyf.error("전송에 실패했어요!");
  }
}
</script>
<template>
  <div class="pomodoro">
    <h2> 🍅 뽀모도로 모드</h2>
    <h1>뽀모도로 횟수: {{ pomoSession }}</h1>
    <p>{{ formattedTime }}</p>
    <button @click="startPomodoro">25분 집중</button>
    <button @click="stopPomodoro">정지</button>
    <button @click="resetPomodoro">초기화</button>
    <button @click="startBreak">5분 휴식</button>
  <div>
    <button @click="sendPomodoroTimerRecord" v-if="isTimeVisible">카카오톡으로 기록 보내기</button>

  </div>
  </div>
</template>

<style scoped>
.pomodoro {
  text-align: center;
}
button {
  margin: 5px;
}
</style>

