package e101.hishop.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import e101.hishop.domain.dto.request.ManufacturerReqDto;
import e101.hishop.domain.dto.request.ProductCategoryReqDto;
import lombok.*;
import org.springframework.util.StringUtils;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Builder
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProductCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE, generator = "entity_product_category")
    @TableGenerator(name = "entity_product_category", initialValue=0, allocationSize=1)
    @Column(name = "category_id")
    private Long id;

    @NotBlank
    private String category;

    @JsonIgnore
    @OneToMany(mappedBy = "productCategory", cascade = CascadeType.PERSIST)
    private List<Product> products = new ArrayList<>();

    public ProductCategory updateProductCategory(ProductCategoryReqDto dto) {
        category = StringUtils.hasText(dto.getCategory()) ? dto.getCategory() : category;
        return this;
    }


}
