package e101.hishop.domain.dto.response;

import e101.hishop.domain.entity.Pay;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class PayInfoRespDto {

    private Long id;

    private String userName;

    private String payName;

    private String payImg;

    private LocalDateTime buyDate;

    private Long buyTotal;

    @Builder
    public PayInfoRespDto(Long id, String userName, String payName, String payImg, LocalDateTime buyDate, Long buyTotal) {
        this.id = id;
        this.userName = userName;
        this.payName = payName;
        this.payImg = payImg;
        this.buyDate = buyDate;
        this.buyTotal = buyTotal;
    }

    public static PayInfoRespDto of(Pay pay) {
        return PayInfoRespDto.builder()
                .id(pay.getId())
                .payName(pay.getPayName())
                .payImg(pay.getPayImg())
                .buyDate(pay.getBuyDate())
                .buyTotal(pay.getBuyTotal())
                .build();
    }
}
