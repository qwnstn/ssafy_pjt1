package e101.hishop.service;

import e101.hishop.domain.dto.request.NewPasswordReqDto;
import e101.hishop.domain.dto.response.UserIdRespDto;
import e101.hishop.domain.entity.User;
import e101.hishop.domain.vo.MailVo;
import e101.hishop.global.common.CommonException;
import e101.hishop.repository.UserJPARepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class MailServiceImpl implements MailService {

    private final JavaMailSender mailSender;
    private final UserJPARepository userJPARepository;

    private static final String title = "Hishop 임시 비밀번호 안내 이메일입니다.";
    private static final String message = "안녕하세요. Hishop 임시 비밀번호 안내 메일입니다. "
            +"\n" + "회원님의 임시 비밀번호는 아래와 같습니다. 로그인 후 반드시 비밀번호를 변경해주세요."+"\n";
    private static final String fromAddress = "e101himart@gmail.com";

    @Override
    public UserIdRespDto sendPwdEmail(NewPasswordReqDto dto) {
        /** 임시 비밀번호 생성 **/
        String tmpPwd = getTmpPassword();
        String name = dto.getName();
        String phone = dto.getPhone();
        LocalDate birthdate = dto.getBirthDate();

        User user = userJPARepository.findByNameAndPhoneAndBirthDate(name, phone, birthdate)
                .orElseThrow(() -> new CommonException(2, "User가 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR));

        user.changeTmpPassword(tmpPwd);

        /** 메일 생성 & 전송 **/
        MailVo mail = createMail(tmpPwd, user.getEmail());
        sendMail(mail);

        log.info("임시 비밀번호 전송 완료");
        return UserIdRespDto.builder()
                .loginId(user.getLoginId())
                .build();

    }

    /** 임시 비밀번호 생성 **/
    @Override
    public String getTmpPassword() {
        char[] charSet = new char[]{ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
                'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '!', '@',
                '#', '$','%','^','&','*','(',')'};
        char[] charSet2 = new char[]{ '!', '@', '#', '$','%','^','&','*','(',')'};

        String pwd = "";

        /* 문자 배열 길이의 값을 랜덤으로 10개를 뽑아 조합 */
        int idx = 0;
        for(int i = 0; i < 10; i++){
            idx = (int) (charSet.length * Math.random());
            pwd += charSet[idx];
        }
        idx = (int) (charSet2.length * Math.random());
        pwd += charSet2[idx];


        log.info("임시 비밀번호 생성");

        return pwd;
    }

    /** 이메일 생성 **/
    @Override
    public MailVo createMail(String tmpPassword, String memberEmail) {

        MailVo mailVo = MailVo.builder()
                .toAddress(memberEmail)
                .title(title)
                .message(message + tmpPassword)
                .fromAddress(fromAddress)
                .build();

        log.info("메일 생성 완료");
        return mailVo;
    }

    /** 이메일 전송 **/
    @Override
    public void sendMail(MailVo mailVo) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(mailVo.getToAddress());
        mailMessage.setSubject(mailVo.getTitle());
        mailMessage.setText(mailVo.getMessage());
        mailMessage.setFrom(mailVo.getFromAddress());
        mailMessage.setReplyTo(mailVo.getFromAddress());

        mailSender.send(mailMessage);

        log.info("메일 전송 완료");
    }
}