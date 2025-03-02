<script>
import { ref, computed } from "vue";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

export default {
  setup() {
    // 알림 라이브러리 설정
    const notyf = new Notyf();

    // 뽀모도로 관련 상태 변수
    const pomoSession = ref(0);
    const time = ref(25 * 60); // 25분
    let interval = null;

    // 시간 포맷팅 (MM:SS)
    const formattedTime = computed(() => {
      const minutes = Math.floor(time.value / 60);
      const seconds = time.value % 60;
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    });

    // 뽀모도로 시작
    const startPomodoro = () => {
      pomoSession.value++;
      if (!interval) {
        interval = setInterval(() => {
          if (time.value > 0) {
            time.value--;
          } else {
            stopPomodoro();
            notyf.success("뽀모도로 완료!");
          }
        }, 1000);
      }
    };

    // 뽀모도로 정지
    const stopPomodoro = () => {
      clearInterval(interval);
      interval = null;
    };

    // 초기화 (25분으로 리셋)
    const resetPomodoro = () => {
      time.value = 25 * 60;
      stopPomodoro();
    };

    // 5분 휴식 시작
    const startBreak = () => {
      stopPomodoro();
      time.value = 5 * 60; // 5분 휴식
      startPomodoro();
    };

    return {
      pomoSession,
      time,
      formattedTime,
      startPomodoro,
      stopPomodoro,
      resetPomodoro,
      startBreak,
    };
  },
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

<template>
  <div class="pomodoro">
    <h2> 🍅 뽀모도로 모드</h2>
    <h1>뽀모도로 횟수: {{ pomoSession }}</h1>
    <p>{{ formattedTime }}</p>
    <button @click="startPomodoro">25분 집중</button>
    <button @click="stopPomodoro">정지</button>
    <button @click="resetPomodoro">초기화</button>
    <button @click="startBreak">5분 휴식</button>
  </div>
</template>
