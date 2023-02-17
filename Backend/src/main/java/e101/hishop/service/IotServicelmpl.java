package e101.hishop.service;

import e101.hishop.domain.dto.request.GuestReqDto;
import e101.hishop.domain.dto.request.MemberReqDto;
import e101.hishop.domain.entity.*;
import e101.hishop.global.common.CommonException;
import e101.hishop.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
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
    private final KioskJPARepository kioskJPARepository;
    private final PayJPARepository payJPARepository;

    @Override
    public Long memberPay(MemberReqDto dto) {
        User user = userJPARepository.findById(dto.getUserId())
                .orElseThrow(() -> new CommonException(2, "User가 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR));
        Card card = cardJPARepository.findById(dto.getCardId())

                .orElseThrow(() -> new CommonException(2, "Card가 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR));
        Kiosk kiosk = kioskJPARepository.findById(dto.getKioskId())
                .orElseThrow(() -> new CommonException(2, "Kiosk가 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR));
        Long branchId = kiosk.getBranch().getId();
        Pay pay = Pay.builder()
                .user(user)
                .payName(card.getName())
//                .payImg(card.getImg)
                .buyDate(dto.getDate())
                .buyTotal(dto.getPriceSum())
                .build();
        adminService.savePay(pay, dto.getUserId());
        List<Map<String, Object>> shoppingList = (List<Map<String, Object>>) dto.getShopping();
        log.info("{}",shoppingList);
        for (Map<String, Object> item: shoppingList) {
            adminService.savePayDetail(PayDetail.builder()
                    .productName(item.get("itemName").toString())
                    .count(Long.parseLong(item.get("count").toString()))
                    .price(Long.parseLong(item.get("price").toString()))
                    .build(), pay.getId(), Long.parseLong(item.get("productId").toString()), branchId);
        }
        return pay.getId();
    }

    @Override
    public Long guestPay(GuestReqDto dto) {
        // 결제과정
        Kiosk kiosk = kioskJPARepository.findById(dto.getKioskId())
                .orElseThrow(() -> new CommonException(2, "kiosk가 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR));
        Long branchId = kiosk.getBranch().getId();
        Pay pay = Pay.builder()
                .payName(dto.getCardInfo().get("cardholderName").toString())
//                .payImg(card.getImg)
                .buyDate(dto.getDate())
                .buyTotal(dto.getPriceSum())
                .build();
        payJPARepository.save(pay);
        List<Map<String, Object>> shoppingList = (List<Map<String, Object>>) dto.getShopping();
        log.info("{}",shoppingList);
        for (Map<String, Object> item: shoppingList) {
            adminService.savePayDetail(PayDetail.builder()
                    .productName(item.get("itemName").toString())
                    .count(Long.parseLong(item.get("count").toString()))
                    .price(Long.parseLong(item.get("price").toString()))
                    .build(), pay.getId(), Long.parseLong(item.get("productId").toString()), branchId);
        }
        return pay.getId();
    }

    @Override
    public Long sendTime() {
        return System.currentTimeMillis() / 1000;
    }
}
