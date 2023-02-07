package e101.hishop.domain.dto.response;

import e101.hishop.domain.entity.PayDetail;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class PayDetailInfoRespDto {

    private Long id;
    private Long payId;
    private Long branchId;
    private String productName;
    private String couponName;
    private Long count;
    private Long price;

    public static PayDetailInfoRespDto of (PayDetail payDetail) {
        return PayDetailInfoRespDto.builder()
                .id(payDetail.getId())
                .payId(payDetail.getPay().getId())
                .branchId(payDetail.getBranch().getId())
                .productName(payDetail.getProductName())
                .couponName(payDetail.getCouponName())
                .count(payDetail.getCount())
                .price(payDetail.getPrice())
                .build();
    }
}
