package e101.hishop.domain.dto.request;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
@NoArgsConstructor
@Setter
public class LoginReqDto {
    @NotBlank
    @Pattern(regexp = "^[a-zA-Z0-9]{4,15}$", message = "아이디는 영문숫자 4~15자")
    private String userId;
    @NotBlank
    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$",message = "비밀번호는 영문숫자특수문자포함 8~25자")
    private String password;
}
