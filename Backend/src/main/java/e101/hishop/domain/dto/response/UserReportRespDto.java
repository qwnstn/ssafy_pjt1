package e101.hishop.domain.dto.response;

import e101.hishop.domain.entity.SaleReport;
import e101.hishop.domain.entity.UserReport;
import e101.hishop.global.enumeration.Gender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class UserReportRespDto {
    private LocalDate date;
    private Gender gender;
    private Long age;
    private String region;
    private Long population;
    private Long sales;

    public static UserReportRespDto of (UserReport userReport) {
        return UserReportRespDto.builder()
                .date(userReport.getDate())
                .gender(userReport.getGender())
                .age(userReport.getAge())
                .region(userReport.getRegion())
                .population(userReport.getPopulation())
                .sales(userReport.getSales())
                .build();
    }
}
