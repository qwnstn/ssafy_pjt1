package e101.hishop.domain.dto.response;

import e101.hishop.domain.entity.Staff;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class StaffRespDto {

    private Long id;
    private String name;
    private String branch;
    private String position;
    private String part;
    private String staffLoginId;

    public static StaffRespDto of(Staff staff) {
        return StaffRespDto.builder()
                .id(staff.getId())
                .name(staff.getName())
                .branch(staff.getBranch().getBranchName())
                .position(staff.getPosition())
                .part(staff.getPart())
                .staffLoginId(staff.getStaffLoginId())
                .build();
    }
}
