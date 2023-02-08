package e101.hishop.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import e101.hishop.AppConfig;
import e101.hishop.domain.dto.request.PayPasswordReqDto;
import e101.hishop.domain.dto.request.UserInfoReqDto;
import e101.hishop.domain.dto.request.UserUpdateReqDto;
import e101.hishop.global.enumeration.Gender;
import e101.hishop.global.enumeration.Role;
import lombok.*;
import org.springframework.util.StringUtils;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Builder
@ToString(exclude = {"cards", "pays"})
@Entity
@Getter
@Table(name = "users")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue
    @Column(name = "user_id")
    private Long id;

    @Column(unique = true)
    private String loginId;

    private String password;

    private String name;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private LocalDate birthDate;

    private String phone;
    private String email;

    private String payPassword;

    private Long defaultCardId;

    private Boolean adSelect;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    private Role role = Role.ROLE_USER;

    @JsonIgnore
    @Builder.Default
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Card> cards = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.PERSIST)
    private List<Point> points = new ArrayList<>();

    @JsonIgnore
    @Builder.Default
    @OneToMany(mappedBy = "user", cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    private List<Pay> pays = new ArrayList<>();

    public User updateUserInfo(UserUpdateReqDto dto) {
        password = StringUtils.hasText(dto.getPassword()) ? AppConfig.testPasswordEncoder().encode(dto.getPassword()) : password;
        phone = StringUtils.hasText(dto.getPhone()) ? dto.getPhone() : phone;
        email = StringUtils.hasText(dto.getEmail()) ? dto.getEmail() : email;
        adSelect = dto.getAdSelect() != null ? dto.getAdSelect() : adSelect;
        return this;
    }

    public User updateUserInfoByAdmin(UserInfoReqDto dto) {
        password = StringUtils.hasText(dto.getPassword()) ? AppConfig.testPasswordEncoder().encode(dto.getPassword()) : password;
        phone = StringUtils.hasText(dto.getPhone()) ? dto.getPhone() : phone;
        email = StringUtils.hasText(dto.getEmail()) ? dto.getEmail() : email;
        adSelect = dto.getAdSelect() != null ? dto.getAdSelect() : adSelect;
        return this;
    }

    public User updateUserByAdmin(UserInfoReqDto dto) {
        loginId = StringUtils.hasText(dto.getLoginId()) ? dto.getLoginId() : loginId;
        name = StringUtils.hasText(dto.getName()) ? dto.getName() : name;
        birthDate = dto.getBirthdate() != null ? dto.getBirthdate() : birthDate;
        return this;
    }


    public void changePayPassword(PayPasswordReqDto dto) {
        this.payPassword = dto.getPayPassword();
    }

    public void changeDefaultCard(Long cardId) {
        this.defaultCardId = cardId;
    }
}
