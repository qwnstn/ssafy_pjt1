package e101.hishop.domain.dto.response;

import e101.hishop.domain.entity.User;
import e101.hishop.global.enumeration.Gender;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class UserInfoRespDto {

    private Long id;
    private String loginId;
    private String name;
    private Gender gender;
    private LocalDate birthDate;
    private String phone;
    private String email;
    private Long defaultCardId;
    private Boolean adSelect;

    @Builder
    public UserInfoRespDto(Long id, String loginId, String name, Gender gender, LocalDate birthDate, String phone, String email, Long defaultCardId, Boolean adSelect) {
        this.id = id;
        this.loginId = loginId;
        this.name = name;
        this.gender = gender;
        this.birthDate = birthDate;
        this.phone = phone;
        this.email = email;
        this.defaultCardId = defaultCardId;
        this.adSelect = adSelect;
    }

    //TODO 유저정보 받아올때 password 뺄것인지 생각
    public static UserInfoRespDto of(User user) {
        return UserInfoRespDto.builder()
                .id(user.getId())
                .loginId(user.getLoginId())
                .email(user.getEmail())
                .name(user.getName())
                .gender(user.getGender())
                .birthDate(user.getBirthDate())
                .phone(user.getPhone())
                .defaultCardId(user.getDefaultCardId())
                .adSelect(user.getAdSelect())
                .build();
    }
}
