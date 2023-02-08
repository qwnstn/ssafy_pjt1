package e101.hishop.repository;

import e101.hishop.domain.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductJPARepository extends JpaRepository<Product, Long> {
    Product findByRfid(String rfid);
    Product findByBarcode(String barcode);
    Boolean existsByName(String name);
    Boolean existsByRfid(String name);
    Boolean existsByBarcode(String name);


}
