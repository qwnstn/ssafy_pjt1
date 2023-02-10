package e101.hishop.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import e101.hishop.domain.dto.request.BranchReqDto;
import e101.hishop.domain.dto.request.StaffReqDto;
import lombok.*;
import org.springframework.util.StringUtils;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Builder
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Branch {

    @Id
    @GeneratedValue
    @Column(name = "branch_id")
    private Long id;

    @NotBlank
    private String branchName;

    @NotBlank
    private String region;

    @JsonIgnore
    @OneToMany(mappedBy = "branch", cascade = CascadeType.PERSIST)
    private List<Staff> staff = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "branch", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<Kiosk> kiosks = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "branch", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<PayDetail> payDetails = new ArrayList<>();
    //지점장 아이디 어떻게 하지

    public Branch updateBranch(BranchReqDto dto) {
        branchName = StringUtils.hasText(dto.getBranchName()) ? dto.getBranchName() : branchName;
        region = StringUtils.hasText(dto.getRegion()) ? dto.getRegion() : region;
        return this;
    }
}
