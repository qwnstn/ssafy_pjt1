package e101.hishop.domain.dto.response;

import e101.hishop.domain.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class ProductRespDto {

    private Long id;
    private String name;
    private Long price;
    private String rfid;
    private String barcode;
    private boolean isAdult;
    private String image;

    public static ProductRespDto of (Product product) {
        return ProductRespDto.builder()
                .id(product.getId())
                .name(product.getName())
                .price(product.getPrice())
                .rfid(product.getRfid())
                .barcode(product.getBarcode())
                .image(product.getImage())
                .isAdult(product.isAdult())
                .build();
    }

}
