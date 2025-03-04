if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js')
            .then(function(registration) {
                console.log('서비스 워커 등록 완료:', registration.scope);
            })
            .catch(function(error) {
                console.log('서비스 워커 등록 실패:', error);
            });
    });
}
