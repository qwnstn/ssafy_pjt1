package e101.hishop.service;

import e101.hishop.domain.dto.request.MemberReqDto;
import e101.hishop.domain.entity.Card;
import e101.hishop.domain.entity.Pay;
import e101.hishop.domain.entity.PayDetail;
import e101.hishop.domain.entity.User;
import e101.hishop.global.common.CommonException;
import e101.hishop.repository.CardJPARepository;
import e101.hishop.repository.ProductJPARepository;
import e101.hishop.repository.UserJPARepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Transactional
@Service
@RequiredArgsConstructor
@Slf4j
public class IotServicelmpl implements IotService{

    private final ProductJPARepository productJPARepository;
    private final AdminService adminService;
    private final UserService userService;
    private final UserJPARepository userJPARepository;
    private final CardJPARepository cardJPARepository;

    @Override
    public Long memberPay(MemberReqDto dto) {
        User user = userJPARepository.findById(dto.getUserId())
                .orElseThrow(() -> new CommonException(2, "Pays객체가 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR));
        Card card = cardJPARepository.findById(dto.getCardId())
                .orElseThrow(() -> new CommonException(2, "Pays객체가 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR));
        Pay.builder()
                .user(user)
                .payName(card.getName())
//                .payImg(card.getImg)
                .buyDate(dto.getDate())
                .buyTotal(dto.getPriceSum())
                .build();
//        List<Map<String, Object>> shoppingList = (List<Map<String, Object>>) dto.getShopping();
//        for (Map<String, Object> item: shoppingList) {
//            PayDetail.builder()
//                    .productName(item.get("itemName"))
//
//                    .build();
//        }
        return 1L;
    }

}
