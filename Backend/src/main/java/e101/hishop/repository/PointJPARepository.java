package e101.hishop.repository;

import e101.hishop.domain.entity.Branch;
import e101.hishop.domain.entity.Point;
import e101.hishop.domain.entity.Staff;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PointJPARepository extends JpaRepository<Point, Long> {
    List<Point> findAllByUserId(Long UserId);
}
