package e101.hishop.domain.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
public class MemberProductReqDto {

    @NotNull
    private Long productId;

    @NotBlank
    private String itemName;

    @NotNull
    @Min(value = 1)
    private Long count;
    @NotNull
    @Min(value = 10)
    @Max(value = 2000000000)
    private Long price;
}
