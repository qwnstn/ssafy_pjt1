package e101.hishop.service;


import e101.hishop.domain.dto.request.*;
import e101.hishop.domain.dto.response.CardInfoRespDto;
import e101.hishop.domain.dto.response.PayDetailInfoRespDto;
import e101.hishop.domain.dto.response.PayInfoRespDto;
import e101.hishop.domain.dto.response.UserInfoRespDto;
import e101.hishop.domain.dto.request.EditNameReqDto;
import e101.hishop.domain.dto.request.PayPasswordReqDto;
import e101.hishop.domain.dto.request.QrReqDto;
import e101.hishop.domain.dto.request.UserInfoReqDto;
import e101.hishop.domain.dto.response.*;
import e101.hishop.domain.entity.Card;
import e101.hishop.domain.entity.Point;

import java.util.List;

public interface UserService {

    Card saveCard(Card cards);
    Card cardLoad(Card cards, Long id);

    List<CardInfoRespDto> cardInfo();

    Boolean deleteCard(Long cardId);

    UserInfoRespDto getUserInfo();

    Long updateUserInfo(UserUpdateReqDto dto);

    void deleteUserInfo();

    Boolean editName(EditNameReqDto dto, Long cardId);

    Boolean editPayPassword(PayPasswordReqDto dto);

    void editMainCard(Long cardId);

    List<PayInfoRespDto> getUserPay();

    List<PayDetailInfoRespDto> getPayDetail(Long purchaseId);

    Long getUserId();
    public String qrRead(QrReqDto dto);
    List<PointRespDto> getPoint();
}
