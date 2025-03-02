import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',  // 자동 업데이트 설정
      filename: 'service-worker.js',  // sw.js 대신 service-worker.js로 변경
      workbox: {
        cleanupOutdatedCaches: true, // 오래된 캐시 정리
        globPatterns: ['**/*.{js,css,html,png,svg,ico,json,webmanifest}'], // 캐시할 파일 패턴
      },
      injectRegister: 'auto',  // Service Worker 자동 등록
      devOptions: {
        enabled: true, // 개발 환경에서도 PWA 활성화
        type: 'module',
        navigateFallback: 'index.html', // 404 방지
      },
      manifest: {
        name: '뽀모도로 타이머',
        short_name: '뽀모도로',
        description: '집중을 도와주는 타이머 앱',
        background_color: '#ffffff',
        theme_color: '#000000',  // ✅ 여기에 넣어줘야 적용됨!
        display: 'standalone',
        start_url: '/',
      }
    }),
  ],
  base: './', // 상대 경로 설정
  server: {
    port: 5173, // ✅ Vite 개발 서버 포트 번호
  },
});
