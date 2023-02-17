package e101.hishop.domain.dto.request;

import e101.hishop.domain.entity.Staff;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
public class KioskReqDto {
    private String url;
    private Long branchId;
}
