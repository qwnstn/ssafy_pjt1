package e101.hishop.domain.dto.request;

import e101.hishop.global.enumeration.Gender;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class SaleReportReqDto {
    private LocalDate date;
    private String category;
    private String region;
    private Long kiosk;
    private Long sales;

}
