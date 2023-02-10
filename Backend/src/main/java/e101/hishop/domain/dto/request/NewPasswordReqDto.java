package e101.hishop.domain.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class NewPasswordReqDto {

    @NotBlank
    @Pattern(regexp = "^[가-힣a-zA-Z]{1,30}$", message = "한글영문 1~30자")
    private String name;
    @NotNull
    @Pattern(regexp = "^01([0|1|6|7|8|9])-([0-9]{3,4})-([0-9]{4})$", message = "000-0000-0000형식")
    private String phone;
    @NotNull
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthDate;


}
