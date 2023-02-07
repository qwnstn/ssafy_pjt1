package e101.hishop.domain.dto.response;

import e101.hishop.domain.entity.Pay;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class PayInfoRespDto {

    private Long id;
    private String loginId;
    private String userName;
    private String payName;
    private String payImg;
    private LocalDateTime buyDate;
    private Long buyTotal;

    public static PayInfoRespDto of(Pay pay) {
        return PayInfoRespDto.builder()
                .id(pay.getId())
                .loginId(pay.getUser().getLoginId())
                .userName(pay.getUser().getName())
                .payName(pay.getPayName())
                .payImg(pay.getPayImg())
                .buyDate(pay.getBuyDate())
                .buyTotal(pay.getBuyTotal())
                .build();
    }
}
