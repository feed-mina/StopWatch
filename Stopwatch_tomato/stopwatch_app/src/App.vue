<template>
  <div>
    <Stopwatch />
    <PomodoroTimer />
  </div>
</template>

<script>
import Stopwatch from "./components/Stopwatch.vue";
import PomodoroTimer from "./components/PomodoroTimer.vue";

export default {
  components: {
    Stopwatch,
    PomodoroTimer
  }
};
</script>
