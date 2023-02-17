package e101.hishop.repository;

import e101.hishop.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface UserJPARepository extends JpaRepository<User, Long> {
    Optional<User> findByLoginId(String loginId);
    Optional<User> findByEmail(String email);
    Optional<User> findByNameAndPhoneAndBirthDate(String name, String phone, LocalDate date);
    Boolean existsByLoginId(String loginId);
}