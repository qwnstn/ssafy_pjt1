package e101.hishop.domain.dto.request;


import e101.hishop.AppConfig;
import e101.hishop.domain.entity.User;
import e101.hishop.global.enumeration.Gender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.time.LocalDate;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SignUpReqDto {

    //TODO 유효성 추가
    @NotBlank
    @Pattern(regexp = "^[a-zA-Z0-9]{4,15}$", message = "아이디는 영문숫자 4~15자")
    private String loginId;

    @NotBlank
    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$",message = "비밀번호는 영문숫자특수문자포함 8~25자")
    private String password;

    @NotBlank
    @Pattern(regexp = "^[가-힣a-zA-Z]{1,30}$", message = "한글영문 1~30자")
    private String name;

    @NotNull
    private Gender gender;

    @NotNull
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthDate;

    @NotBlank
    @Pattern(regexp = "^01([0|1|6|7|8|9])-([0-9]{3,4})-([0-9]{4})$", message = "000-0000-0000형식")
    private String phone;

    @Email(message = "유효한이메일이 아님")
    @NotBlank
    private String email;

    @NotNull
    private Boolean adSelect;

    public User toUsersEntity(){
        return User.builder()
                .loginId(loginId)
                .gender(gender)
                .birthDate(birthDate)
                .adSelect(adSelect)
                .email(email)
                .phone(phone)
                .name(name)
                .password(AppConfig.testPasswordEncoder().encode(password))
                .build();
    }
}