package e101.hishop.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import e101.hishop.domain.dto.request.ManufacturerReqDto;
import e101.hishop.domain.dto.request.ProductReqDto;
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
public class Manufacturer {

    @Id
    @GeneratedValue
    @Column(name = "manu_id")
    private Long id;

    @NotBlank
    private String name;

    private String address;

    private String tel;

    @JsonIgnore
    @OneToMany(mappedBy = "manufacturer", cascade = CascadeType.PERSIST)
    private List<Product> products = new ArrayList<>();

    public Manufacturer updateManufacturer(ManufacturerReqDto dto) {
        name = StringUtils.hasText(dto.getName()) ? dto.getName() : name;
        address = StringUtils.hasText(dto.getAddress()) ? dto.getAddress() : address;
        tel = StringUtils.hasText(dto.getTel()) ? dto.getTel() : tel;
        return this;
    }

}
