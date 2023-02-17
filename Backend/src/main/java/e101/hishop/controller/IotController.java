package e101.hishop.controller;

import e101.hishop.domain.dto.request.*;
import e101.hishop.service.IotService;
import e101.hishop.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/iot")
@RequiredArgsConstructor
public class IotController {
    private final IotService iotService;

    @GetMapping("/shopping/{kioskId}")
    public ResponseEntity<List<Map<String, Object>>> shopping(@PathVariable Long kioskId) {
        List<Map<String, Object>> json = new ArrayList<>();
        Map<String, Object> injson1 = new HashMap<>();
        Map<String, Object> injson2 = new HashMap<>();
        Map<String, Object> injson3 = new HashMap<>();
        injson1.put("name", "오징어집");
        injson1.put("count", 5);
        injson1.put("price", 3000);
        injson2.put("name", "커카콜라");
        injson2.put("count", 1);
        injson2.put("price", 20000);
        injson3.put("name", "커카콜라 할인쿠폰");
        injson3.put("count", 1);
        injson3.put("price", -500);
        json.add(injson1);
        json.add(injson2);
        json.add(injson3);
        return new ResponseEntity<>(json, HttpStatus.OK);
    }

    @PostMapping("/member")
    public ResponseEntity<String> memberPay(@RequestBody MemberReqDto dto) {
        iotService.memberPay(dto);
        return new ResponseEntity<>("결제 완료", HttpStatus.OK);
    }

    @PostMapping("/guest")
    public ResponseEntity<String> guestPay(@RequestBody GuestReqDto dto) {
        iotService.guestPay(dto);
        return new ResponseEntity<>("결제 완료", HttpStatus.OK);
    }

    @PostMapping("/init")
    public String init() {
        return "init";
    }

    @GetMapping("/time")
    public ResponseEntity<Long> sendTime() {
        return new ResponseEntity<>(iotService.sendTime(), HttpStatus.OK);
    }
}
