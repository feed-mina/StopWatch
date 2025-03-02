package com.my.app.myjavaapp.controller;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/kakao")
public class KakaoController {

    // application.properties 에 있는 값 불러오기
    @Value("${KAKAO_CLIENT_ID}")
    private String clientId;


    @Value("${KAKAO_REDIRECT_URI}")
    private String redirectUri;

    private String accessToken;
    
    private static final String KAKAO_URL = "https://kapi.kakao.com/v2/api/talk/memo/default/send";

    @GetMapping("/login")
    public String kakaoLogin() {
        System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@");
        System.out.println("kakao login");
        System.out.println("client_id : " + clientId);
        System.out.println("redirectUri : " + redirectUri);

        return "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=" + clientId + "&redirect_uri=" + redirectUri;
    }

    @GetMapping("/callback")
    public String getAccessToken(@RequestParam String code) {

        System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@");
        System.out.println("kakao callback");
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        String body = "grant_type=authorization_code" +
                "&client_id=" + clientId +
                "&redirect_uri=" + redirectUri +
                "&code=" + code;

        System.out.println("headers : " + headers);
        System.out.println("body : " + body);
        System.out.println("client_id : " + clientId);
        System.out.println("redirectUri : " + redirectUri);
        System.out.println("code : " + code);

        HttpEntity<String> request = new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = restTemplate.exchange(
                "https://kauth.kakao.com/oauth/token",
                HttpMethod.POST,
                request,
                Map.class
        );

        accessToken = (String) response.getBody().get("access_token");
        System.out.println("accessToken : " + accessToken);

        return "Access Token 발급 성공! : " + accessToken;
    }

    @PostMapping("/sendRecord")
    public ResponseEntity<String> sendRecord(@RequestBody Map<String, Object> data) {

        System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@");
        System.out.println("kakao sendRecord");
       // clientId, redirectUri 체크
        if (clientId == null || redirectUri == null) {
            String loginUrl = "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=" + clientId + "&redirect_uri=" + redirectUri;
            System.out.println("로그인이 필요해요. 로그인 페이지로 보내줄게요!");
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED) // 401번 오류
                    .body(loginUrl); // 로그인 주소 보내기
        }

        if (accessToken == null) {
            System.out.println("먼저 카카오 로그인해서 Access Token을 받아야 해요");
            String loginUrl = "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=" + clientId + "&redirect_uri=" + redirectUri;
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(loginUrl);
        }

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken); // Access Token 넣기
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        Integer stopwatchTime = (Integer) data.get("stopwatchTime");
        Integer pomodoroCount = (Integer) data.get("pomodoroCount");
        Integer pomodoroTotalTime = (Integer) data.get("pomodoroTotalTime");
        StringBuilder message = new StringBuilder();

        System.out.println("stopwatchTime : " + stopwatchTime);
        System.out.println("pomodoroCount : " + pomodoroCount);
        System.out.println("pomodoroTotalTime : " + pomodoroTotalTime);

        if (stopwatchTime != null) {
            int minutes = stopwatchTime / 60;
            int seconds = stopwatchTime % 60;
            message.append("⏱️ 스탑워치 기록: " + minutes + "분 " + seconds + "초\n");
            System.out.println("⏱\uFE0F 스탑워치 기록: \" + minutes + \"분 \" + seconds + \"초\\n");
            // 스탑워치 처리 로직
        }
        System.out.println("message1 : " + message);
        if (pomodoroCount != null && pomodoroTotalTime != null) {
            message.append("🍅 뽀모도로: " + pomodoroCount + "회, 총 " + pomodoroTotalTime + "분 완료!");
            System.out.println("\uD83C\uDF45 뽀모도로: \" + pomodoroCount + \"회, 총 \" + pomodoroTotalTime + \"분 완료!");
        }
        if (message.length() == 0) {
            message.append("❗ 기록이 없어요.");
        }
        // 카톡에 보낼 메시지 내용
      //  String body = "template_object={\"object_type\":\"text\",\"text\":\"햄이 보낸 메시지! 😊\",\"link\":{\"web_url\":\"https://www.kakao.com\"}}";
        String body = "template_object={\"object_type\":\"text\",\"text\":\"" + message + "\",\"link\":{\"web_url\":\"https://www.kakao.com\"}}";

        System.out.println("body : " + body);
        HttpEntity<String> request = new HttpEntity<>(body, headers);


        ResponseEntity<String> response = restTemplate.postForEntity(
                KAKAO_URL, // 카톡 보내기 주소
                request,
                String.class
        );
        System.out.println("response : " + response);
        return ResponseEntity.ok("카톡 전송 성공!");

    }

    @PostMapping("/sendStopwatchTime")
    public ResponseEntity<String> sendStopwatchMessage(@RequestBody Map<String, Object> data) {
        // 데이터 꺼내기
//        Integer stopwatchTime = (Integer) data.get("timer");
        Object stopwatchTimeObj = data.get("timer");
        Integer stopwatchTime = null;

        if (stopwatchTimeObj instanceof Integer) {
            stopwatchTime = (Integer) stopwatchTimeObj;
        } else if (stopwatchTimeObj instanceof LinkedHashMap) {
            stopwatchTime = (Integer) ((LinkedHashMap) stopwatchTimeObj).get("value");
        }
        // 메시지 만들기
        StringBuilder message = new StringBuilder();
        if(stopwatchTime != null) {
            int minutes = stopwatchTime / 60;
            int seconds = stopwatchTime % 60;

            message.append("⏱️ 타이머 기록: " + minutes + "분 " + seconds + "초\n");

        }

        // 카카오톡에 보낼 준비
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        headers.set("Content-Type", "application/x-www-form-urlencoded");

        String body = "template_object={\"object_type\":\"text\",\"text\":\"" + message + "\",\"link\":{\"web_url\":\"https://www.kakao.com\"}}";

        HttpEntity<String> entity = new HttpEntity<>(body, headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.postForEntity(KAKAO_URL, entity, String.class);

        return response;
    }




    @PostMapping("/sendPomodoroTimer")
    public ResponseEntity<String> sendPomodoroMessage(@RequestBody Map<String, Object> data) {
        // 스탑워치 초 단위
        Integer pomodoroCount = (Integer) data.get("pomodoroCount"); // 뽀모도로 횟수
        Integer pomodoroTotalTime = (Integer) data.get("pomodoroTotalTime"); // 뽀모도로 총 사용 시간


        // 메시지 만들기
        StringBuilder message = new StringBuilder();

        if(pomodoroCount != null && pomodoroCount > 0 && pomodoroTotalTime != null  ) {
            message.append("🍅 뽀모도로: " + pomodoroCount + "회, 총 " + pomodoroTotalTime + "분 완료!");
        }
        if (message.length() == 0) {
            message.append("❗ 기록이 없어요.");
        }

        // 카카오톡에 보낼 준비
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        headers.set("Content-Type", "application/x-www-form-urlencoded");

        String body = "template_object={\"object_type\":\"text\",\"text\":\"" + message + "\",\"link\":{\"web_url\":\"https://www.kakao.com\"}}";

        HttpEntity<String> entity = new HttpEntity<>(body, headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.postForEntity(KAKAO_URL, entity, String.class);

        return response;
    }
}
