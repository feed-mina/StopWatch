self.addEventListener("install", event => {
    console.log("Service Worker 설치 완료!");
    event.waitUntil(
      caches.open("pwa-cache").then(cache => {
        return cache.addAll([
          "/",
          "/index.html",
          "/manifest.json",
          "/src/assets/alarm.wav",
          "/src/assets/toy.mp3",
          "/src/assets/bird.mp3"
        ]);
      })
    );
  });
  
  self.addEventListener("fetch", event => {
    console.log('Fetching:', event.request.url);
    const url = new URL(event.request.url);
      // 카카오 SDK는 그냥 통과시키기
  
      if (url.origin.includes('kakaocdn.net') || url.origin.includes('kakao.com')) {
        return;
      }
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  });
  