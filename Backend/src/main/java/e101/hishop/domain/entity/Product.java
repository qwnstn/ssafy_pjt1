package e101.hishop.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import e101.hishop.domain.dto.request.ProductReqDto;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.util.StringUtils;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Builder
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Product {

    @Id
    @GeneratedValue
    @Column(name = "product_id")
    private Long id;
    @NotBlank
    private String name;
    @NotNull
    private Long price;
    private String rfid;
    private String barcode;
    private String image;

    @JsonIgnore
    @Builder.Default
    @OneToMany(mappedBy = "product")
    private List<PayDetail> payDetails = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "manu_id")
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    private Manufacturer manufacturer;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "category_id")
//    private ProductCategory productCategory;

    public void setManufacturersAndProducts(Manufacturer manufacturer) {
        this.manufacturer = manufacturer;
        manufacturer.getProducts().add(this);
    }
    public Product updateProduct(ProductReqDto dto) {
        name = StringUtils.hasText(dto.getName()) ? dto.getName() : name;
        price = dto.getPrice() != null ? dto.getPrice() : price;
        rfid = StringUtils.hasText(dto.getRfid()) ? dto.getRfid() : rfid;
        barcode = StringUtils.hasText(dto.getBarcode()) ? dto.getBarcode() : barcode;
        image = StringUtils.hasText(dto.getImage()) ? dto.getImage() : image;
        return this;
    }

}
