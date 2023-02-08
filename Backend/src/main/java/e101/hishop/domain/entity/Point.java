package e101.hishop.domain.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@ToString(exclude = {"user, cardCategory"})
@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Point {
    @Id
    @GeneratedValue
    @Column(name = "point_id")
    private Long id;

    private Long point;

    private LocalDateTime endDate;

    private String category;

    private String description;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
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
}

