package e101.hishop.service;

import e101.hishop.domain.dto.request.*;
import e101.hishop.domain.dto.response.*;
import e101.hishop.domain.entity.*;
import e101.hishop.global.common.CommonException;
import e101.hishop.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Transactional
@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserJPARepository userJPARepository;
    private final PayJPARepository payJPARepository;
    private final PayDetailJPARepository payDetailJPARepository;
    private final CardJPARepository cardJPARepository;
    private final PointJPARepository pointJPARepository;
    private WebClient webClient;


    @Override
    public Card saveCard(Card card) {
        User user = userJPARepository.findById(getUserId())
                .orElseThrow(() -> new CommonException(2, "User객체가 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR));
        log.info("user, {}", user);
        card.setUsersAndCards(user);
        return cardJPARepository.save(card);
    }

    @Override
    public Card cardLoad(Card cards, Long id) {
        User user = userJPARepository.findById(id)
                .orElseThrow(() -> new CommonException(2, "User객체가 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR));
        log.info("user, {}", user);
        cards.setUsersAndCards(user);
        return cardJPARepository.save(cards);
    }


    @Override
    public List<CardInfoRespDto> cardInfo() {
        List<CardInfoRespDto> respList = new ArrayList<>();
        List<Card> list = cardJPARepository.findAllByUserId(getUserId());
        for (Card p : list) {
            log.info("CARD_INFO=========================================================");
            log.info("{}", p);
            respList.add(CardInfoRespDto.builder()
                    .cardId(p.getId())
                    .cardNo(p.getCardNo().substring(0, 4))
                    .name(p.getName())
                    .validDate(p.getValidDate())
                    .build());
        }
        return respList;
    }

    @Override
    public Boolean deleteCard(Long cardId) {
        User user = userJPARepository.findById(getUserId())
                .orElseThrow(() -> new CommonException(2, "User객체가 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR));
        Card card = cardJPARepository.findById(cardId)
                .orElseThrow(() -> new CommonException(2, "Card객체가 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR));;
        if (!card.getUser().equals(user)) {
            throw new CommonException(9, "유저소유카드가 아닙니다", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        if (user.getDefaultCardId().equals(cardId)) {
            editMainCard(null);
        }
        cardJPARepository.deleteById(cardId);
        return true;
    }

    @Override
    public void editMainCard(Long cardId){
        User user = userJPARepository.findById(getUserId())
                .orElseThrow(() -> new CommonException(2, "User객체가 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR));
        if (cardId != null) {
            Card card = cardJPARepository.findById(cardId)
                    .orElseThrow(() -> new CommonException(2, "Card객체가 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR));;
            if (!card.getUser().equals(user)) {
                throw new CommonException(9, "유저소유카드가 아닙니다", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        user.changeDefaultCard(cardId);
    }

    @Override
    public Boolean editPayPassword(PayPasswordReqDto dto){
        User user = userJPARepository.findById(getUserId())
                .orElseThrow(() -> new CommonException(2, "User객체가 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR));
        user.changePayPassword(dto);
        return true;
    }

    @Override
    public UserInfoRespDto getUserInfo() {
        User user = userJPARepository.findById(getUserId())
                .orElseThrow(() -> new CommonException(2, "User객체가 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR));
        return UserInfoRespDto.of(user);
    }

    @Override
    public Long updateUserInfo(UserUpdateReqDto dto) {
        return userJPARepository.findById(getUserId())
                .orElseThrow(() -> new CommonException(2, "User객체가 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR))
                .updateUserInfo(dto)
                .getId();
    }

    @Override
    public void deleteUserInfo() {
        userJPARepository.deleteById(getUserId());
    }

    @Override
    public Boolean editName(EditNameReqDto dto, Long cardId) {
        Card card = cardJPARepository.findById(cardId)
                .orElseThrow(() -> new CommonException(2, "Card가 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR));
        User user = userJPARepository.findById(getUserId())
                .orElseThrow(() -> new CommonException(2, "User객체가 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR));
        if (!(card.getUser().getId().equals(getUserId()))) throw new CommonException(9, "유저소유카드가 아닙니다.", HttpStatus.BAD_REQUEST);
        card.setName(dto.getName());
        return true;
    }

    @Override
    public List<PayInfoRespDto> getUserPay() {
        List<Pay> pay = payJPARepository.findAllByUserId(getUserId());
        List<PayInfoRespDto> payList = new ArrayList<>();
        for (Pay p: pay) {
            payList.add(PayInfoRespDto.of(p));
        }
        return payList;
    }

    @Override
    public List<PayDetailInfoRespDto> getPayDetail(Long purchaseId) {
        Pay pay = payJPARepository.findById(purchaseId)
                .orElseThrow(() -> new CommonException(2, "pay가 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR));
        if (!(pay.getUser().getId().equals(getUserId()))) throw new CommonException(9, "유저소유pay가 아닙니다.", HttpStatus.BAD_REQUEST);
        List<PayDetail> payDetails = payDetailJPARepository.findAllByPayId(purchaseId);
        List<PayDetailInfoRespDto> payDetailList = new ArrayList<>();
        for (PayDetail p: payDetails) {
            payDetailList.add(PayDetailInfoRespDto.of(p));
        }
        return payDetailList;
    }

    @Override
    public Long getUserId() {
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String username = loggedInUser.getName();

        User user = userJPARepository.findByLoginId(username)
                .orElseThrow(() -> new CommonException(2, "User객체가 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR));
        return user.getId();
    }

    @PostConstruct
    public void initWebClient() {
//        webClient = WebClient.create("http://localhost:7777/");
        webClient = WebClient.create("http://192.168.30.114:8000/");
    }
    @Override
    public String qrRead(QrReqDto dto) {
        Long userId = dto.getUserId();
        User user = userJPARepository.findById(userId)
                .orElseThrow(() -> new CommonException(2, "User객체가 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR));
        Long defaultCardId = user.getDefaultCardId();
        List<Card> cards = cardJPARepository.findAllByUserId(userId);
        List<Object> cardList = new ArrayList<>();
        for (Card c: cards) {
            HashMap hashMap = new HashMap<String, Optional>();
            hashMap.put("cardId", c.getId());
            hashMap.put("cardName", c.getName());
            hashMap.put("cardNo", c.getCardNo().substring(0, 4));
            cardList.add(hashMap);
        }
        CardSendRespDto cardSendRespDto = CardSendRespDto.builder()
                .userId(userId)
                .defaultCardId(defaultCardId)
                .cardList(cardList)
                .build();
        Mono<String> response = webClient.post()
                .uri("/api/kiosk/cardinfo")
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromObject(cardSendRespDto))
                .retrieve()
                .bodyToMono(String.class);
        return response.block();
    }

    @Override
    public List<PointRespDto> getPoint() {
        User user = userJPARepository.findById(getUserId())
                .orElseThrow(() -> new CommonException(2, "User객체가 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR));
        List<Point> point = pointJPARepository.findAllByUserId(user.getId());
        List<PointRespDto> pointList = new ArrayList<>();
        for (Point p: point) {
            pointList.add(PointRespDto.of(p));
        }
        return pointList;
    }

    @Override
    public String sendDB() {
//        List<Object> productList = new ArrayList<>();
//        for (int i = 0; i < 4; i++) {
//            HashMap hashMap = new HashMap<String, Optional>();
//            hashMap.put("productId", 4234);
//            hashMap.put("name", "꺼깔콘");
//            hashMap.put("price", 3000);
//            hashMap.put("rfid", "3124875");
//            hashMap.put("barcode", null);
//            hashMap.put("image", "img.jpg");
//            productList.add(hashMap);
//        }
//        EggDto eggDto = EggDto.builder()
//                .product(productList)
//                .build();
        log.info("보낸다");
        Mono<String> response = webClient.get()
                .uri("/docs")
                .retrieve()
                .bodyToMono(String.class);
        log.info("안터짐?");
//        log.info("{}", response.toString());
        return "123";
    }
}
