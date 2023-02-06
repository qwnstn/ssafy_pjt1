package e101.hishop.service;

import e101.hishop.domain.dto.request.MemberReqDto;
import e101.hishop.domain.dto.request.RfidReqDto;

public interface IotService {
    Long memberPay(MemberReqDto dto);
}
