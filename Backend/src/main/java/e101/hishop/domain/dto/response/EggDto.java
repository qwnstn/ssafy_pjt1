package e101.hishop.domain.dto.response;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class EggDto {
    private List<Object> product;

    @Builder
    public EggDto(List<Object> product) {
        this.product = product;
    }
}
