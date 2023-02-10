package e101.hishop.domain.dto.request;

import e101.hishop.domain.entity.Branch;
import e101.hishop.domain.entity.Staff;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BranchReqDto {
    private String branchName;
    private String region;

    public Branch toBranchEntity(){
        return Branch.builder()
                .branchName(branchName)
                .region(region)
                .build();
    }
}
