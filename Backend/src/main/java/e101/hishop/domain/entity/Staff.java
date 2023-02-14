package e101.hishop.domain.entity;

import e101.hishop.domain.dto.request.StaffEditReqDto;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.util.StringUtils;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Builder
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Staff {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE, generator = "entity_staff")
    @TableGenerator(name = "entity_staff", initialValue=0, allocationSize=1)
    @Column(name = "staff_id")
    private Long id;

    @NotBlank
    private String name;

    @NotBlank
    private String position;

    private String part;

    private String staffLoginId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id")
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    private Branch branch;

    public void setBranchAndStaff(Branch branch) {
        this.branch = branch;
        branch.getStaff().add(this);
    }

    public Staff updateStaff(StaffEditReqDto dto) {
        name = StringUtils.hasText(dto.getName()) ? dto.getName() : name;
        position = StringUtils.hasText(dto.getPosition()) ? dto.getPosition() : position;
        part = StringUtils.hasText(dto.getPart()) ? dto.getPart() : part;
        staffLoginId = StringUtils.hasText(dto.getStaffLoginId()) ? dto.getStaffLoginId() : staffLoginId;
        return this;
    }

}
