package e101.hishop.domain.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class QrReqDto {
    private Long kioskId;
    private Long datetime;
}
