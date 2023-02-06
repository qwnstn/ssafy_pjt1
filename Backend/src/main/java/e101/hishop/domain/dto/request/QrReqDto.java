package e101.hishop.domain.dto.request;

import e101.hishop.domain.entity.Branch;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class QrReqDto {
    private Long userId;
    private Long kioskId;

    private LocalDate datetime;
}
