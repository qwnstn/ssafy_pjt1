package e101.hishop.repository;

import e101.hishop.domain.entity.SaleReport;
import e101.hishop.domain.entity.UserReport;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SaleReportJPARepository extends JpaRepository<SaleReport, Long> {
}
