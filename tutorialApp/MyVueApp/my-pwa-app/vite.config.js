import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
   //css: {postcss: "./postcss.config.cjs"}, PostCSS 설정 파일 직접 지정 
  server: {
    force: true,
    strictPort: true, // 포트 충돌 방지
    hmr: {
        overlay: false // 오류 메시지 화면 출력 방지
    }
  },
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
    }),
  ],
  base: './', // 상대 경로 설정
})
