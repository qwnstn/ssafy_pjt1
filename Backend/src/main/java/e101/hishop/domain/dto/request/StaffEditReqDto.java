package e101.hishop.domain.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class StaffEditReqDto {
    private Long branchId;
    private String name;
    private String position;
    private String part;
    private String staffLoginId;

}
