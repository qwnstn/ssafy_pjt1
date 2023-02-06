package e101.hishop.domain.dto.request;

import e101.hishop.domain.entity.Card;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
@NoArgsConstructor
public class CardSaveReqDto {
    @NotBlank
    @Pattern(regexp = "^\\d{4}-\\d{4}-\\d{4}-\\d{4}$", message = "유효한 카드번호가 아닙니다.")
    //TODO Unique 추가
    private String cardNo;

    @NotBlank
    @Pattern(regexp = "^[가-힣a-zA-Z]{1,30}$", message = "한글영문 1~30자")
    private String name;

    @NotBlank
    @Pattern(regexp="^[0-9]{4}$", message="유효기간은 4자리여야 합니다.")
    private String validDate;

    @NotBlank
    @Pattern(regexp="^[0-9]{3}$", message="CVC는 3자리여야 합니다.")
    private String cvc;


    public Card toPaymentEntity(){
        return Card.builder()
                .cardNo(cardNo)
                .name(name)
                .validDate(validDate)
                .build();
    }

}
