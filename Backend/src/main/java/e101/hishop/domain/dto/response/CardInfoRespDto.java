package e101.hishop.domain.dto.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
@Builder
public class CardInfoRespDto {

    private Long cardId;
    private String cardNo;
    private String name;
    private String validDate;

    @NotNull
    private String cvc;

    @Builder
    public CardInfoRespDto(Long cardId, String cardNo, String name, String validDate, String cvc) {
        this.cardId = cardId;
        this.cardNo = cardNo;
        this.name = name;
        this.validDate = validDate;
        this.cvc = cvc;
    }
}
