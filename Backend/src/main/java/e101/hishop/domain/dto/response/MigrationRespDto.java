package e101.hishop.domain.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class MigrationRespDto {
    private List<MigrationProductRespDto> product;

    @Builder
    public MigrationRespDto(List<MigrationProductRespDto> productList) {
        this.product = productList;
    }
}