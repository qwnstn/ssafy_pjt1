package e101.hishop.service;

import e101.hishop.domain.dto.request.NewPasswordReqDto;
import e101.hishop.domain.dto.response.UserIdRespDto;
import e101.hishop.domain.vo.MailVo;

public interface MailService {
    MailVo createMail(String tmpPassword, String memberEmail);
    void sendMail(MailVo mailVo);
    String getTmpPassword();
    UserIdRespDto sendPwdEmail(NewPasswordReqDto dto);
}
