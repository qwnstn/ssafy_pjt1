package e101.hishop.repository;

import e101.hishop.domain.entity.Card;
import e101.hishop.domain.entity.CardCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CardCategoryJPARepository extends JpaRepository<CardCategory, Long> {
}
