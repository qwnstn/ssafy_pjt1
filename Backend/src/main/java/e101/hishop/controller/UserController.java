package e101.hishop.controller;

import e101.hishop.domain.dto.request.*;
import e101.hishop.domain.dto.response.*;
import e101.hishop.global.common.CommonResponse;
import e101.hishop.service.MailService;
import e101.hishop.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {

    private final UserService userService;
    private final MailService mailService;

    @GetMapping
    public ResponseEntity<UserInfoRespDto> getUserInfo() {
        return new ResponseEntity<>(userService.getUserInfo(), HttpStatus.OK);
    }

    @PatchMapping
    public CommonResponse updateUserInfo(@RequestBody @Validated  UserUpdateReqDto dto) {
        return CommonResponse.builder()
                .data(Map.of("userId", userService.updateUserInfo(dto)))
                .build();
    }

    @DeleteMapping
    public ResponseEntity<String> deleteUserInfo() {
        userService.deleteUserInfo();
        return new ResponseEntity<>("제거완료", HttpStatus.OK);
    }

    @GetMapping("/card")
    public ResponseEntity<List<CardInfoRespDto>> userCardInfo() {
        List<CardInfoRespDto> payments = userService.cardInfo();
        return new ResponseEntity<>(payments, HttpStatus.OK);
    }

    @PostMapping("/card")
    public ResponseEntity<String> userCardSave(@RequestBody @Validated CardSaveReqDto dto) {
        userService.saveCard(dto.toCardEntity());
        return new ResponseEntity<>("저장완료", HttpStatus.OK);
    }

    @PatchMapping("/card/{cardId}")
    public ResponseEntity<String> cardNameEdit(@RequestBody EditNameReqDto dto,@PathVariable Long cardId) {
        userService.editName(dto, cardId);
        return new ResponseEntity<>("수정완료", HttpStatus.OK);
    }

    @DeleteMapping("/card/{cardId}")
    public ResponseEntity<String> userCardDelete(@PathVariable Long cardId) {
        //TODO 카드아이디가 해당 유저 소속인지 유효성검사 필요
        userService.deleteCard(cardId);
        return new ResponseEntity<>("삭제완료", HttpStatus.OK);
    }

    @PatchMapping("/card/{cardId}/main")
    public ResponseEntity<String> cardMainEdit(@PathVariable Long cardId) {
        userService.editMainCard(cardId);
        return new ResponseEntity<>("수정완료", HttpStatus.OK);
    }

    @PatchMapping("/card/password")
    public ResponseEntity<String> userPayPasswordEdit(@RequestBody @Validated PayPasswordReqDto dto) {
            try {
                userService.editPayPassword(dto);
                return new ResponseEntity<>("수정완료", HttpStatus.OK);
            } catch (NoSuchElementException e) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "비밀번호는 숫자 4자리여야 합니다.");
            }
    }

    @GetMapping("/purchase")
    public ResponseEntity<List<PayInfoRespDto>> userPurchaseInfo() {
        return new ResponseEntity<>(userService.getUserPay(), HttpStatus.OK);
    }

    @GetMapping("/purchase/{purchaseId}")
    public ResponseEntity<List<PayDetailInfoRespDto>> userPurchaseDetail(@PathVariable Long purchaseId) {
        //TODO 유효성 검사
        return new ResponseEntity<>(userService.getPayDetail(purchaseId), HttpStatus.OK);
    }


    @PostMapping("/qr")
    public ResponseEntity<String> qrRead(@RequestBody QrReqDto dto) {
        if ("Fail".equals(userService.qrRead(dto))) {
            return new ResponseEntity<>("유효기간 만료", HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>("전달 완료", HttpStatus.OK);
        }
    }



    @GetMapping("/point")
    public ResponseEntity<List<PointRespDto>> getPoint() {
        return new ResponseEntity<>(userService.getPoint(), HttpStatus.OK);
    }

}
