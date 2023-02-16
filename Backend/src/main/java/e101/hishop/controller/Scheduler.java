package e101.hishop.controller;

import e101.hishop.service.SchedulingService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;

@Controller // component 스캔을 가능하게 한다.
@RequiredArgsConstructor
public class Scheduler {

    private final SchedulingService schedulingService;

    @Scheduled(fixedRate = 60000) // 메소드 호출이 종료되는 시간에서 10000ms(10초) 이후 재 호출
    public void doFixedRateJob() {
        schedulingService.job("fixedRate");
    }
}