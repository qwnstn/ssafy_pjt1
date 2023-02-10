package e101.hishop.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Pay {

    @Id
    @GeneratedValue
    @Column(name = "pay_id")
    private Long id;

    //TODO LAZY로 변경?
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    @JsonIgnore
    private User user;

    @NotBlank
    private String payName;

    private String payImg;

    @NotNull
    private LocalDateTime buyDate;

    @NotNull
    private Long buyTotal;

    public void setUsersAndPay(User user) {
        this.user = user;
        user.getPays().add(this);
    }


    @JsonIgnore
    @Builder.Default
    @OneToMany(mappedBy = "pay")
    private List<PayDetail> payDetails = new ArrayList<>();

    @Builder
    public Pay(String payName, String payImg, LocalDateTime buyDate, Long buyTotal) {
        this.payName = payName;
        this.payImg = payImg;
        this.buyDate = buyDate;
        this.buyTotal = buyTotal;
    }
}
