package e101.hishop.domain.dto.request;

import e101.hishop.domain.entity.Card;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
@NoArgsConstructor
public class CardCategoryReqDto {
    @NotBlank
    private String classification;
    private String paymentName;
    private String img;

}
