<template>
    <div>
      <h1>카카오 로그인 화면</h1>
      <button @click="kakaoLogin">카카오로 로그인</button>
    </div>
  </template>
  

  <script setup>
  import { onMounted} from 'vue'
  
  // 부모(App.vue)에 성공 알리기
  const emit = defineEmits(['loginSuccess'])
  
  onMounted(() => {
  if (window.Kakao) {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(import.meta.env.VITE_KAKAO_JS_KEY); 
    console.log('카카오 초기화 완료 ✅', import.meta.env.VITE_KAKAO_JS_KEY);

    }
  } else {
    console.error('❌ 카카오 SDK 로드 안됨 ');
  } 
});

  
function kakaoLogin() {
  if (window.Kakao && window.Kakao.Auth) {
    window.Kakao.Auth.login({
      success: function(authObj) {
        console.log('로그인 성공!', authObj);
      },
      fail: function(err) {
        console.error('❌ 로그인 실패', err);
      }
    });
  } else {
    console.error('카카오 SDK가 아직 로드되지 않았어요!');
  }
}

  </script>