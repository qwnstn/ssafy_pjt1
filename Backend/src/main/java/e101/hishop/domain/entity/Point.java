package e101.hishop.domain.entity;

import e101.hishop.domain.dto.request.BranchReqDto;
import e101.hishop.domain.dto.request.PointReqDto;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.util.StringUtils;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

//@ToString(exclude = {"user, cardCategory"})
@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Point {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE, generator = "entity_point")
    @TableGenerator(name = "entity_point", initialValue=0, allocationSize=1)
    @Column(name = "point_id")
    private Long id;

    private Long point;

    private LocalDateTime endDate;

    private String category;

    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    private User user;


    public void setUsersAndPoints(User user) {
        this.user = user;
        user.getPoints().add(this);
    }


    @Builder
    public Point(Long id, Long point, LocalDateTime endDate, String category, String description) {
        this.id = id;
        this.point = point;
        this.endDate = endDate;
        this.category = category;
        this.description = description;
    }

    public Point updatePoint(PointReqDto dto) {
        point = dto.getPoint() != null ? dto.getPoint() : point;
        endDate = dto.getEndDate() != null ? dto.getEndDate() : endDate;
        category = StringUtils.hasText(dto.getCategory()) ? dto.getCategory() : category;
        description = StringUtils.hasText(dto.getDescription()) ? dto.getDescription() : description;
        return this;
    }
}

