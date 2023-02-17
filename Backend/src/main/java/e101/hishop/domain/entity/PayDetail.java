package e101.hishop.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PayDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE, generator = "entity_pay_detail")
    @TableGenerator(name = "entity_pay_detail", initialValue=0, allocationSize=1)
    @Column(name = "pay_detail_id")
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "pay_id")
    @JsonIgnore
    private Pay pay;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    @JsonIgnore
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id")
    @JsonIgnore
    private Branch branch;
    private String productName;
    private Long count;
    private Long price;

    public void setPayAndPayDetail(Pay pay) {
        this.pay = pay;
        pay.getPayDetails().add(this);
    }
    public void setProductAndPayDetail(Product product) {
        this.product = product;
        product.getPayDetails().add(this);
    }

    public void setBranchAndPayDetail(Branch branch) {
        this.branch = branch;
        branch.getPayDetails().add(this);
    }

    @Builder
    public PayDetail(Long id, String productName, Long count, Long price) {
        this.id = id;
        this.productName = productName;
        this.count = count;
        this.price = price;
    }
}
