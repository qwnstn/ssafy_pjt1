package e101.hishop.domain.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@ToString(exclude = {"user, cardCategory"})
@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Point {
    @Id
    @GeneratedValue
    @Column(name = "card_id")
    private Long id;

    private Long amount;

    private LocalDate endDate;

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
    public Point(Long id, Long amount, LocalDate endDate, String category, String description) {
        this.id = id;
        this.amount = amount;
        this.endDate = endDate;
        this.category = category;
        this.description = description;
    }
}

