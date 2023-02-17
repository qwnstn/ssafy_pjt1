package e101.hishop.domain.dto.request;

import e101.hishop.domain.entity.Manufacturer;
import e101.hishop.domain.entity.ProductCategory;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ProductCategoryReqDto {
    private Long id;
    private String category;
    public ProductCategory toProductCategoryEntity(){
        return ProductCategory.builder()
                .id(id)
                .category(category)
                .build();
    }
}
