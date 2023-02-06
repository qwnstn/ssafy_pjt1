package e101.hishop.domain.dto.request;

import e101.hishop.domain.entity.Pay;
import e101.hishop.domain.entity.Product;
import e101.hishop.repository.UserJPARepository;
import e101.hishop.service.UserService;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.h2.engine.User;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
public class MemberReqDto {
    private Long userId;
    private Long kioskId;
    private Long cardId;
    private LocalDateTime date;
    private Long priceSum;
    private List shopping;

}
