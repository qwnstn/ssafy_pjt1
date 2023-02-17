package e101.hishop.domain.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
public class MemberReqDto {
    private Long userId;
    private Long kioskId;
    private Long cardId;
    private LocalDateTime date;
    private Long priceSum;
    private List<MemberProductReqDto> shopping;

}
