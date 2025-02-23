import { register } from 'register-service-worker'

register('/service-worker.js', {
  ready () {
    console.log('PWA가 준비되었습니다! (오프라인에서도 동작 가능)')
  },
  registered () {
    console.log('Service Worker가 등록되었습니다.')
  },
  cached () {
    console.log('콘텐츠가 캐시되었습니다!')
  },
  updatefound () {
    console.log('새로운 업데이트를 다운로드 중...')
  },
  updated () {
    console.log('새 버전이 설치되었습니다. 새로고침하세요!')
  },
  offline () {
    console.log('인터넷 연결이 없지만 PWA가 실행됩니다!')
  },
  error (error) {
    console.error('Service Worker 등록 중 오류 발생:', error)
  }
})
