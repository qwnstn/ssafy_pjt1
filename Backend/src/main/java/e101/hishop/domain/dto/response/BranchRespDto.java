package e101.hishop.domain.dto.response;

import e101.hishop.domain.entity.Branch;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BranchRespDto {

    private Long id;
    private String branchName;
    private String region;


    @Builder
    public BranchRespDto(Long id, String branchName, String region) {
        this.id = id;
        this.branchName = branchName;
        this.region = region;
    }



    public static BranchRespDto of(Branch branch) {
        return BranchRespDto.builder()
                .id(branch.getId())
                .branchName(branch.getBranchName())
                .region(branch.getRegion())
                .build();
    }
}
