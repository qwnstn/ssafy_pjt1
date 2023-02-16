package e101.hishop.domain.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Card {

    //카드이름
    //기본여부
    //카드번호
    //유효기간

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE, generator = "entity_card")
    @TableGenerator(name = "entity_card", initialValue=0, allocationSize=1)
    @Column(name = "card_id")
    private Long id;

    private String name;

    //TODO 추후 암호화 필요
    private String cardNo;

    private String validDate;

    private String cvc;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "card_category_id")
    private CardCategory cardCategory;

    //입력하지않으면 기본값 false
//    @PrePersist
//    public void prePersist(){
//        this.isDefault = this.isDefault != null && this.isDefault;
//    }


    public void setUsersAndCards(User user) {
        this.user = user;
        user.getCards().add(this);
    }

    public void setCardCategoryandCards(CardCategory cardCategory) {
        this.cardCategory = cardCategory;
        cardCategory.getCards().add(this);
    }

    @Builder
    public Card(String name, String cardNo, String validDate, String cvc) {
        this.name = name;
        this.cardNo = cardNo;
        this.validDate = validDate;
        this.cvc = cvc;
    }
}

