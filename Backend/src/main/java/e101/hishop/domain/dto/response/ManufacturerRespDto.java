package e101.hishop.domain.dto.response;

import e101.hishop.domain.entity.Manufacturer;
import e101.hishop.domain.entity.Point;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class ManufacturerRespDto {

    private Long manuid;

    private String name;

    private String address;
    private String tel;

    @Builder
    public ManufacturerRespDto(Long manuid, String name, String address, String tel) {
        this.manuid = manuid;
        this.name = name;
        this.address = address;
        this.tel = tel;
    }


    public static ManufacturerRespDto of (Manufacturer manufacturer) {
        return ManufacturerRespDto.builder()
                .manuid(manufacturer.getId())
                .name(manufacturer.getName())
                .address(manufacturer.getAddress())
                .tel(manufacturer.getTel())
                .build();
    }

}
