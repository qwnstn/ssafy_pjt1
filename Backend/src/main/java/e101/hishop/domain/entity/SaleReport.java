package e101.hishop.domain.entity;

import e101.hishop.global.enumeration.Gender;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Builder
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SaleReport {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE, generator = "sale_report_entity")
    @TableGenerator(name = "sale_report_entity", initialValue=0, allocationSize=1)
    @Column(name = "sale_report_id")
    private Long id;
    private LocalDate date;
    private String category;
    private String region;
    private Long kiosk;
    private Long sales;


}
