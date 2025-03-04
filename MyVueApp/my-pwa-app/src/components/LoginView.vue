<template>
  <div  class="login-container">
     <!-- <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" /> -->
     <button class="kakao-button" @click="kakaoLogin">   
     <img alt="kakaoLogin" class="logo" src="../assets/kakao_login_bt.png" />
     </button>
     <p class="login-guide">로그인 후 시작해볼까요? 😊</p>
  </div>
</template>
<script setup>
  import { onMounted } from 'vue';
  const emit = defineEmits(['loginSuccess']);
  
  onMounted(() => {
    if (!window.Kakao || !window.Kakao.isInitialized()) {
      const kakaoScript = document.createElement("script");
      kakaoScript.src = "https://developers.kakao.com/sdk/js/kakao.js";
      kakaoScript.onload = () => {
        window.Kakao.init(import.meta.env.VITE_KAKAO_JS_KEY);
        console.log(" 카카오 SDK 로드 완료");
      };
      kakaoScript.onerror = () => {
        console.error("❌ 카카오 SDK 로드 안됨");
      };
      document.head.appendChild(kakaoScript);
    }
  });
  
  function kakaoLogin() {
    if (window.Kakao && window.Kakao.Auth) {
      window.Kakao.Auth.login({
        scope: "talk_message", 
        success: function(authObj) {
          console.log('로그인 성공!', authObj);
          // 토큰 저장
          localStorage.setItem('kakaoAccessToken', authObj.access_token);
          emit('loginSuccess');
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