package e101.hishop.repository;

import e101.hishop.domain.entity.Kiosk;
import e101.hishop.domain.entity.UserReport;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserReportJPARepository extends JpaRepository<UserReport, Long> {
}
