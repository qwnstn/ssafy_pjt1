package e101.hishop.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalTime;

@Service
@RequiredArgsConstructor
public class SchedulingService {

    private final AdminService adminService;
    public void job(String option) {
//        adminService.migration();
        System.out.println(option + " scheduling job start : " + LocalTime.now());
        System.out.println(option + " scheduling job end : " + LocalTime.now());
    }
}
