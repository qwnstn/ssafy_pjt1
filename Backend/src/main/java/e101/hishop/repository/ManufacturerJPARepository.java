package e101.hishop.repository;

import e101.hishop.domain.entity.Manufacturer;
import e101.hishop.domain.entity.Point;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ManufacturerJPARepository extends JpaRepository<Manufacturer, Long> {
}
