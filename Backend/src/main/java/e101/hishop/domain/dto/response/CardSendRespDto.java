package e101.hishop.domain.dto.response;


import e101.hishop.domain.entity.Card;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Objects;

@Getter
@NoArgsConstructor
public class CardSendRespDto {

    private Long userId;
    private Long defaultCardId;
    private List<Object> cardList;

    @Builder
    public CardSendRespDto(Long userId, Long defaultCardId, List<Object> cardList) {
        this.userId = userId;
        this.defaultCardId = defaultCardId;
        this.cardList = cardList;
    }
}
