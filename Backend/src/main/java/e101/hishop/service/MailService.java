package e101.hishop.service;

import e101.hishop.domain.vo.MailVo;

public interface MailService {
    MailVo createMail(String tmpPassword, String memberEmail);
    void sendMail(MailVo mailVo);
}
