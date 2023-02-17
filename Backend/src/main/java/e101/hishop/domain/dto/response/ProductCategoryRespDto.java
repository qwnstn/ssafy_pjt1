package e101.hishop.domain.dto.response;

import e101.hishop.domain.entity.Manufacturer;
import e101.hishop.domain.entity.ProductCategory;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ProductCategoryRespDto {

    private Long categoryId;

    private String category;

    @Builder
    public ProductCategoryRespDto(Long categoryId, String category) {
        this.categoryId = categoryId;
        this.category = category;
    }

    public static ProductCategoryRespDto of (ProductCategory productCategory) {
        return ProductCategoryRespDto.builder()
                .categoryId(productCategory.getId())
                .category(productCategory.getCategory())
                .build();
    }

}
