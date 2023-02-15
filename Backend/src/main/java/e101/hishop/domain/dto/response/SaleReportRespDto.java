package e101.hishop.domain.dto.response;

import e101.hishop.domain.entity.Product;
import e101.hishop.domain.entity.SaleReport;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class SaleReportRespDto {
    private LocalDate date;
    private String category;
    private String region;
    private Long kiosk;
    private Long sales;

    public static SaleReportRespDto of (SaleReport saleReport) {
        return SaleReportRespDto.builder()
                .date(saleReport.getDate())
                .category(saleReport.getCategory())
                .region(saleReport.getRegion())
                .kiosk(saleReport.getKiosk())
                .sales(saleReport.getSales())
                .build();
    }

}
