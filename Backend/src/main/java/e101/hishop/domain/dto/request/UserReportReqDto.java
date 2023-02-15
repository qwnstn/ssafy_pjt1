package e101.hishop.domain.dto.request;

import e101.hishop.global.enumeration.Gender;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class UserReportReqDto {
    private LocalDate date;
    private Gender gender;
    private Long age;
    private String region;
    private Long population;
    private Long sales;

}
