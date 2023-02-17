package e101.hishop.domain.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class PayDetailReqDto {

    private Long count;
    private String productName;
    private Long price;
    private Long branchId;
    private Long payId;
    private Long productId;
}
