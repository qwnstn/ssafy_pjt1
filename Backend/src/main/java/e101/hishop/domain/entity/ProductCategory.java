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
public class ProductCategory {

    @Id
    @GeneratedValue
    @Column(name = "category_id")
    private Long id;

    private String category;

    @JsonIgnore
    @OneToMany(mappedBy = "productCategory", cascade = CascadeType.PERSIST)
    private List<Product> products = new ArrayList<>();




}
