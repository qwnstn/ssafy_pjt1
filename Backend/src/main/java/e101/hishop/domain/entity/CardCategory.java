package e101.hishop.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Builder
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CardCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE, generator = "entity_card_category")
    @TableGenerator(name = "entity_card_category", initialValue=0, allocationSize=1)
    @Column(name = "card_category_id")
    private Long id;

    private String classification;

    private String paymentName;

    private String img;

    @JsonIgnore
    @Builder.Default
    @OneToMany(mappedBy = "cardCategory", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    private List<Card> cards = new ArrayList<>();

}

