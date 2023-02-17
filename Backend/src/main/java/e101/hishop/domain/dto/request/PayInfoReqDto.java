package e101.hishop.domain.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class PayInfoReqDto {

    @NotBlank
    private LocalDateTime buyDate;
    private Long buyTotal;
    private String payImg;
    private String payName;
    private Long userId;
}
