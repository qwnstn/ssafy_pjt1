package e101.hishop.domain.dto.request;

import e101.hishop.domain.entity.Manufacturer;
import e101.hishop.domain.entity.Point;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class ManufacturerReqDto {
    private Long manuId;
    private String name;
    private String address;
    private String tel;
    public Manufacturer toManufacturerEntity(){
        return Manufacturer.builder()
                .id(manuId)
                .name(name)
                .address(address)
                .tel(tel)
                .build();
    }
}
