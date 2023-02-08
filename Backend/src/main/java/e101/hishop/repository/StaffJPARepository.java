package e101.hishop.repository;

import e101.hishop.domain.entity.Staff;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StaffJPARepository extends JpaRepository<Staff, Long> {
    List<Staff> findAllByBranchId(Long branchId);
    Boolean existsByStaffLoginId(String loginId);
}
