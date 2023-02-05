package e101.hishop.domain.dto.response;

import e101.hishop.domain.entity.Branch;
import e101.hishop.domain.entity.Staff;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BranchRespDto {

    private Long id;
    private String brnachName;

    private String region;


    @Builder
    public BranchRespDto(Long id, String brnachName, String region) {
        this.id = id;
        this.brnachName = brnachName;
        this.region = region;
    }



    public static BranchRespDto of(Branch branch) {
        return BranchRespDto.builder()
                .id(branch.getId())
                .brnachName(branch.getBranchName())
                .region(branch.getRegion())
                .build();
    }
}
