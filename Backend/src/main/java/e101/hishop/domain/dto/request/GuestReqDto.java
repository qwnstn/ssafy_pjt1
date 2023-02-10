package e101.hishop.domain.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Getter
@NoArgsConstructor
public class GuestReqDto {
    private Long kioskId;
    private LocalDateTime date;
    private Map<String, Object> cardInfo;
    private Long priceSum;
    private List shopping;

}
