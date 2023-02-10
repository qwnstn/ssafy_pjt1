package e101.hishop.domain.dto.response;

import e101.hishop.domain.entity.CardCategory;
import e101.hishop.domain.entity.User;
import e101.hishop.global.enumeration.Gender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
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
