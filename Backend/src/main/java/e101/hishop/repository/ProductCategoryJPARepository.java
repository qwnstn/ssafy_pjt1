package e101.hishop.repository;

import e101.hishop.domain.entity.Manufacturer;
import e101.hishop.domain.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductCategoryJPARepository extends JpaRepository<ProductCategory, Long> {
}
