package e101.hishop.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

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
public class Kiosk {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE, generator = "entity_kiosk")
    @TableGenerator(name = "entity_kiosk", initialValue=0, allocationSize=1)
    @Column(name = "kiosk_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id")
    private Branch branch;

    private String url;

    public void setBranchAndKiosk(Branch branch) {
        this.branch = branch;
        this.url = url;
        branch.getKiosks().add(this);
    }

}
