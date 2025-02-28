module.exports = {
  publicPath: './',
  pwa: {
    name: 'My PWA App',
    themeColor: '#42b983',
    msTileColor: '#000000',
    manifestOptions: {
      background_color: '#ffffff'
    },
    workboxPluginMode: "InjectManifest", // ✅ Service Worker 강제 생성 방식 변경
    workboxOptions: {
      swSrc: "src/service-worker.js", // ✅ Service Worker를 직접 추가
      swDest: "service-worker.js", // ✅ 생성된 파일을 `dist/` 폴더에 저장
      skipWaiting: true,
      clientsClaim: true
    }
  }
};
