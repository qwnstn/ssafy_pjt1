package e101.hishop.mail;

import e101.hishop.domain.vo.MailVo;
import e101.hishop.service.MailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
@Slf4j
@RequiredArgsConstructor
public class MailTest {

    @Autowired
    private MailService mailService;

    @Test
    public void sendTest() {
        MailVo mailVo = mailService.createMail("1234","blackcube222@gmail.com");


        mailService.sendMail(mailVo);

        log.info("메일 전송 완료");
    }
}
