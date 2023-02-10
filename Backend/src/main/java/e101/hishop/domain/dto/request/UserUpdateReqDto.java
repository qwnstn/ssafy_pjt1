package e101.hishop.domain.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Getter
@NoArgsConstructor
public class UserUpdateReqDto {

    @NotBlank
    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$",message = "비밀번호는 영문숫자특수문자포함 8~25자")
    private String password;
    @NotBlank
    @Pattern(regexp = "^01([0|1|6|7|8|9])-([0-9]{3,4})-([0-9]{4})$", message = "000-0000-0000형식")
    private String phone;
    @Email
    private String email;
    @NotNull
    private Boolean adSelect;
}
