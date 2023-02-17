package e101.hishop.domain.dto.request;

import e101.hishop.domain.entity.Product;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.*;

@Getter
@NoArgsConstructor
public class ProductReqDto {
    @NotNull
    private Long manuId;

    private Long categoryId;
    @NotBlank
    @Pattern(regexp = "^[가-힣a-zA-Z0-9]{1,250}$", message = "한글영문 1~250자")
    private String name;
    @NotNull
    @Min(value = 10)
    @Max(value = 2000000000)
    private Long price;
    @Pattern(regexp="^[a-zA-Z0-9]{16}$", message="rfid 영문숫자 16자리여야 합니다.")
    private String rfid;
    @Pattern(regexp="^[0-9]{5,20}$", message="바코드 숫자 5~20자리여야 합니다.")
    private String barcode;
    private String image;

    private Boolean isAdult;

    public Product toProductEntity(){
        return Product.builder()
                .name(name)
                .price(price)
                .rfid(rfid)
                .barcode(barcode)
                .image(image)
                .isAdult(isAdult)
                .build();
    }
}
