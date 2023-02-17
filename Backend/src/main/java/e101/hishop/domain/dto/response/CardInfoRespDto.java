package e101.hishop.domain.dto.response;


import e101.hishop.domain.entity.CardCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class CardInfoRespDto {

    private Long cardId;
    private String cardNo;
    private String name;
    private String validDate;
    private CardCategory cardCategory;
}
