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
public class UserReport {

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE, generator = "user_report_entity")
    @TableGenerator(name = "user_report_entity", initialValue=0, allocationSize=1)
    @Column(name = "user_report_id")
    private Long id;
    private LocalDate date;
    private Gender gender;
    private Long age;
    private String region;
    private Long population;
    private Long sales;


}
