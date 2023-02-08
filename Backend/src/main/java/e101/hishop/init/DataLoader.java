package e101.hishop.init;

import e101.hishop.AppConfig;
import e101.hishop.domain.entity.*;
import e101.hishop.global.enumeration.Gender;
import e101.hishop.global.enumeration.Role;
import e101.hishop.repository.CardJPARepository;
import e101.hishop.repository.UserJPARepository;
import e101.hishop.service.AdminService;
import e101.hishop.service.AuthService;
import e101.hishop.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Component
@Slf4j
public class DataLoader {

    @Autowired
    private AuthService authService;

    @Autowired
    private UserService userService;

    @Autowired
    private CardJPARepository cardJPARepository;

    @Autowired
    private UserJPARepository userJPARepository;

    @Autowired
    private AdminService adminService;

    //method invoked during the startup
    @PostConstruct
    public void loadData(){

        // id 1 : user
        authService.signUp(User.builder()
                .loginId("user1234")
                .gender(Gender.MALE)
                .birthDate(LocalDate.of(1993,12,31))
                .adSelect(true)
                .email("EMAIL@naver.com")
                .name("NAME")
                .password(AppConfig.testPasswordEncoder().encode("user1234!"))
                .defaultCardId(2L)
                .build());

        // id 2 : card
        userService.cardLoad(Card.builder()
                .cardNo("1234121211111111")
                .name("신한")
                .validDate("0121")
                .cvc("123")
                .build(), 1L);

        // id 3 : card
        userService.cardLoad(Card.builder()
                .cardNo("555121211111111")
                .name("국민")
                .validDate("0121")
                .cvc("654")
                .build(), 1L);

        // id 4 : pay
        adminService.savePay(Pay.builder()
                .payName("삼성")
                .payImg("img.jpg")
                .buyDate(LocalDateTime.of(2022,12,12,12,12,12,1234))
                .buyTotal(50000L)
                .build(), 1L);

        // id 5 : user
        authService.signUp(User.builder()
                .loginId("admin1234")
                .gender(Gender.MALE)
                .birthDate(LocalDate.of(1999,12,31))
                .adSelect(false)
                .email("EMAIL@naver.com")
                .name("NAME")
                .password(AppConfig.testPasswordEncoder().encode("admin1234!"))
                .role(Role.ROLE_ADMIN)
                .build());

        // id 6 : manufacturer
        adminService.saveManufacturer(Manufacturer.builder()
                .name("녹데")
                .address("부산광역시 강서구 녹산산업중로 333")
                .tel("051-123-1234")
                .build());

        // id 7 : manufacturer
        adminService.saveManufacturer(Manufacturer.builder()
                .name("동심")
                .address("부산광역시 강서구 녹산산업중로 333")
                .tel("031-876-5234")
                .build());

        // id 8 : manufacturer
        adminService.saveProductCategory(ProductCategory.builder()
                .category("과자")
                .build());

        // id 9 : manufacturer
        adminService.saveProductCategory(ProductCategory.builder()
                .category("음료")
                .build());

        // id 10 : product
        adminService.saveProduct(Product.builder()
                .name("세우깡")
                .price(1500L)
                .rfid("FC4947AC500104E0")
                .barcode("01243252")
                .image("")
                .build(), 6L, 8L);

        // id 11 : product
        adminService.saveProduct(Product.builder()
                .name("꺼깔콘")
                .price(2000L)
                .rfid("BB4247AC500104E0")
                .barcode("14103252")
                .image("")
                .build(), 7L, 8L);

        // id 12 : product
        adminService.saveProduct(Product.builder()
                .name("팝씨")
                .price(1530L)
                .rfid("FE9146AC500104E0")
                .barcode("44103222")
                .image("")
                .build(), 6L, 9L);

        // id 13 : branch
        adminService.saveBranch(Branch.builder()
                .branchName("부산점")
                .region("부산광역시 강서구 녹산산업중로 333")
                .build());

        // id 14 : branch
        adminService.saveBranch(Branch.builder()
                .branchName("서울점")
                .region("서울시 강남구 테헤란로 212")
                .build());

        // id 15 : staff
        adminService.saveStaff(Staff.builder()
                .name("김싸피")
                .position("점장")
                .part("지점장")
                .staffLoginId("kimssafy")
                .build(), 13L);

        // id 16 : payDetail
        adminService.savePayDetail(PayDetail.builder()
                .productName("세우깡")
                .count(1L)
                .price(1500L)
                .build(), 4L, 10L, 13L);

        // id 17 : payDetail
        adminService.savePayDetail(PayDetail.builder()
                .productName("꺼깔콘")
                .count(2L)
                .price(4000L)
                .build(), 4L, 11L, 13L);

        // id 18 : kiosk
        adminService.saveKiosk(Kiosk.builder().build(), 13L);

        // id 19 : card
        userService.cardLoad(Card.builder()
                .cardNo("1968267535975189")
                .name("사사")
                .validDate("2221")
                .build(), 5L);

        // id 20 : user
        authService.signUp(User.builder()
                .loginId("consult_user")
                .gender(Gender.MALE)
                .birthDate(LocalDate.of(1993,12,31))
                .adSelect(true)
                .email("Consultant@gmail.com")
                .name("서컨턴")
                .password(AppConfig.testPasswordEncoder().encode("pass1234!"))
                .build());

        // id 21 : user
        authService.signUp(User.builder()
                .loginId("consult_admin")
                .gender(Gender.MALE)
                .birthDate(LocalDate.of(1993,12,31))
                .adSelect(true)
                .email("Consultant@gmail.com")
                .name("서컨턴")
                .password(AppConfig.testPasswordEncoder().encode("pass1234!"))
                .role(Role.ROLE_ADMIN)
                .build());

        // id 22 : user
        authService.signUp(User.builder()
                .loginId("coach_user")
                .gender(Gender.MALE)
                .birthDate(LocalDate.of(1993,12,31))
                .adSelect(true)
                .email("Coach_park@gmail.com")
                .name("박코치")
                .password(AppConfig.testPasswordEncoder().encode("pass1234!"))
                .build());

        // id 23 : user
        authService.signUp(User.builder()
                .loginId("coach_admin")
                .gender(Gender.MALE)
                .birthDate(LocalDate.of(1993,12,31))
                .adSelect(true)
                .email("EMAIL@naver.com")
                .name("김코치")
                .password(AppConfig.testPasswordEncoder().encode("pass1234!"))
                .role(Role.ROLE_ADMIN)
                .build());

        // id 24 : user
        adminService.savePoint(Point.builder()
                .point(40000L)
                .endDate(LocalDateTime.of(2024,1,1,23,59,59,0))
                .category("적립")
                .description("구매 적립")
                .build(), 1L);

    }

    //method invoked during the shutdown
//    @PreDestroy
//    public void removeData() {
//        userRepository.deleteAll();
//    }

}