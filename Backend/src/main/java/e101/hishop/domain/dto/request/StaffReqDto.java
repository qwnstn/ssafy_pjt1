package e101.hishop.domain.dto.request;

import e101.hishop.domain.entity.Staff;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
public class StaffReqDto {
    @NotNull
    private Long branchId;
    @NotBlank
    private String name;
    @NotBlank
    private String position;
    @NotBlank
    private String part;
    @NotBlank
    private String staffLoginId;

    public Staff toStaffEntity(){
        return Staff.builder()
                .name(name)
                .position(position)
                .part(part)
                .staffLoginId(staffLoginId)
                .build();
    }
}
