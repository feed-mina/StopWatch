package com.my.app.myjavaapp.controller;


import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController
@RequestMapping("/api/kakao")
public class KakaoController {


    private static final String KAKAO_TOKEN = "여기에_카카오톡_토큰을_넣어주세요";
    private static final String KAKAO_URL = "https://kapi.kakao.com/v2/api/talk/memo/default/send";



    @PostMapping("/send")
    public ResponseEntity<String> sendMessage(@RequestBody Map<String, Object> data) {
        int elapsedTime = (int) data.get("elapsedTime");
        int minutes = elapsedTime / 60;
        int seconds = elapsedTime % 60;
        String message = "⏱️ 타이머 기록: " + minutes + "분 " + seconds + "초";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + KAKAO_TOKEN);
        headers.set("Content-Type", "application/x-www-form-urlencoded");

        String body = "template_object={\"object_type\":\"text\",\"text\":\"" + message + "\",\"link\":{\"web_url\":\"https://www.kakao.com\"}}";

        HttpEntity<String> entity = new HttpEntity<>(body, headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.postForEntity(KAKAO_URL, entity, String.class);

        return response;
    }
}
