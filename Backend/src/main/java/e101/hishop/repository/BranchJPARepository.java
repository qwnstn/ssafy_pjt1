package e101.hishop.repository;

import e101.hishop.domain.entity.Branch;
import e101.hishop.domain.entity.PayDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BranchJPARepository extends JpaRepository<Branch, Long> {
}
