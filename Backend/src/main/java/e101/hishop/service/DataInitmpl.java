package e101.hishop.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import e101.hishop.AppConfig;
import e101.hishop.domain.dto.request.*;
import e101.hishop.domain.entity.*;
import e101.hishop.global.common.CommonException;
import e101.hishop.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class DataInitmpl implements DataInit {

    private final UserJPARepository userJPARepository;
    private final CardCategoryJPARepository cardCategoryJPARepository;
    private final CardJPARepository cardJPARepository;
    private final PointJPARepository pointJPARepository;
    private final PayJPARepository payJPARepository;
    private final BranchJPARepository branchJPARepository;
    private final StaffJPARepository staffJPARepository;
    private final KioskJPARepository kioskJPARepository;
    private final ManufacturerJPARepository manufacturerJPARepository;
    private final ProductCategoryJPARepository productCategoryJPARepository;
    private final ProductJPARepository productJPARepository;
    private final PayDetailJPARepository payDetailJPARepository;

    @Override
    public void initUser() {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        ClassLoader classLoader = getClass().getClassLoader();

        try {
            InputStream inputStream = classLoader.getResourceAsStream("json/users.json");
            List<UserInfoReqDto> list = objectMapper.readValue(inputStream, new TypeReference<List<UserInfoReqDto>>(){});
            for (UserInfoReqDto u : list) {
                User user = User.builder()
                        .loginId(u.getLoginId())
                        .gender(u.getGender())
                        .birthDate(u.getBirthdate())
                        .adSelect(u.getAdSelect())
                        .email(u.getEmail())
                        .name(u.getName())
                        .password(AppConfig.testPasswordEncoder().encode(u.getPassword()))
                        .payPassword(u.getPayPassword())
                        .phone(u.getPhone())
                        .defaultCardId(u.getDefaultCardId())
                        .build();
                userJPARepository.save(user);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    @Override
    public void initCardCategory() {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        ClassLoader classLoader = getClass().getClassLoader();

        try {
            List<CardCategoryReqDto> list = Arrays.asList(objectMapper.readValue(new File(classLoader.getResource("json/cardCategory.json").getFile()), CardCategoryReqDto[].class));
            for (CardCategoryReqDto d : list) {
                CardCategory cardCategory = CardCategory.builder()
                        .classification(d.getClassification())
                        .paymentName(d.getPaymentName())
                        .img(d.getImg())
                        .build();
                cardCategoryJPARepository.save(cardCategory);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    @Override
    public void initCard() {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        ClassLoader classLoader = getClass().getClassLoader();

        try {
            List<CardSaveReqDto> list = Arrays.asList(objectMapper.readValue(new File(classLoader.getResource("json/card.json").getFile()), CardSaveReqDto[].class));
            for (CardSaveReqDto d : list) {
                User user = userJPARepository.findById(d.getUserId())
                        .orElseThrow(() -> new CommonException(2, "User객체가 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR));
                CardCategory cardCategory = cardCategoryJPARepository.findById(d.getCardCategoryId())
                        .orElseThrow(() -> new CommonException(2, "CardCategory객체가 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR));
                Card card = Card.builder()
                        .name(d.getName())
                        .cardNo(d.getCardNo())
                        .validDate(d.getValidDate())
                        .cvc(d.getCvc())
                        .build();
                card.setUsersAndCards(user);
                card.setCardCategoryandCards(cardCategory);
                cardJPARepository.save(card);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    @Override
    public void initPoint() {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        ClassLoader classLoader = getClass().getClassLoader();

        try {
            List<PointReqDto> list = Arrays.asList(objectMapper.readValue(new File(classLoader.getResource("json/point.json").getFile()), PointReqDto[].class));
            for (PointReqDto d : list) {
                User user = userJPARepository.findById(d.getUserId())
                        .orElseThrow(() -> new CommonException(2, "User객체가 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR));
                Point point = Point.builder()
                        .point(d.getPoint())
                        .endDate(d.getEndDate())
                        .category(d.getCategory())
                        .description(d.getDescription())
                        .build();
                point.setUsersAndPoints(user);
                pointJPARepository.save(point);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    @Override
    public void initPay() {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        ClassLoader classLoader = getClass().getClassLoader();

        try {
            List<PayInfoReqDto> list = Arrays.asList(objectMapper.readValue(new File(classLoader.getResource("json/pay.json").getFile()), PayInfoReqDto[].class));
            for (PayInfoReqDto d : list) {
                User user = userJPARepository.findById(d.getUserId())
                        .orElseThrow(() -> new CommonException(2, "User객체가 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR));
                Pay pay = Pay.builder()
                        .buyDate(d.getBuyDate())
                        .buyTotal(d.getBuyTotal())
                        .payImg(d.getPayImg())
                        .payName(d.getPayName())
                        .build();
                pay.setUsersAndPay(user);
                payJPARepository.save(pay);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    @Override
    public void initBranch() {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        ClassLoader classLoader = getClass().getClassLoader();

        try {
            List<BranchReqDto> list = Arrays.asList(objectMapper.readValue(new File(classLoader.getResource("json/branch.json").getFile()), BranchReqDto[].class));
            for (BranchReqDto b : list) {
                Branch branch = Branch.builder()
                        .branchName(b.getBranchName())
                        .region(b.getRegion())
                        .build();
                branchJPARepository.save(branch);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    @Override
    public void initStaff() {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        ClassLoader classLoader = getClass().getClassLoader();

        try {
            List<StaffReqDto> list = Arrays.asList(objectMapper.readValue(new File(classLoader.getResource("json/staff.json").getFile()), StaffReqDto[].class));
            for (StaffReqDto d : list) {
                Branch branch = branchJPARepository.findById(d.getBranchId())
                        .orElseThrow(() -> new CommonException(2, "Branch객체가 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR));
                Staff staff = Staff.builder()
                        .name(d.getName())
                        .part(d.getPart())
                        .position(d.getPosition())
                        .staffLoginId(d.getStaffLoginId())
                        .build();
                staff.setBranchAndStaff(branch);
                staffJPARepository.save(staff);
            }
        } catch (IOException e) { e.printStackTrace(); }
    }
    @Override
    public void initKiosk() {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        ClassLoader classLoader = getClass().getClassLoader();

        try {
            List<KioskReqDto> list = Arrays.asList(objectMapper.readValue(new File(classLoader.getResource("json/kiosk.json").getFile()), KioskReqDto[].class));
            for (KioskReqDto d : list) {
                Branch branch = branchJPARepository.findById(d.getBranchId())
                        .orElseThrow(() -> new CommonException(2, "Branch객체가 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR));
                Kiosk kiosk = Kiosk.builder()
                        .url(d.getUrl())
                        .build();
                kiosk.setBranchAndKiosk(branch);
                kioskJPARepository.save(kiosk);
            }
        } catch (IOException e) { e.printStackTrace(); }
    }
    @Override
    public void initManufacturer() {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        ClassLoader classLoader = getClass().getClassLoader();

        try{
            List<ManufacturerReqDto> list = Arrays.asList(objectMapper.readValue(new File(classLoader.getResource("json/manufacturer.json").getFile()), ManufacturerReqDto[].class));
            for (ManufacturerReqDto m: list) {
                Manufacturer manufacturer = Manufacturer.builder()
                        .name(m.getName())
                        .address(m.getAddress())
                        .tel(m.getTel())
                        .build();
                manufacturerJPARepository.save(manufacturer);
            }
        }catch (IOException e) {e.printStackTrace();}
    }
    @Override
    public void initProductCategory() {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        ClassLoader classLoader = getClass().getClassLoader();

        try{
            List<ProductCategoryReqDto> list = Arrays.asList(objectMapper.readValue(new File(classLoader.getResource("json/productCategory.json").getFile()), ProductCategoryReqDto[].class));
            for (ProductCategoryReqDto m: list) {
                ProductCategory productCategory = ProductCategory.builder()
                        .category(m.getCategory())
                        .build();
                productCategoryJPARepository.save(productCategory);
            }
        }catch (IOException e) {e.printStackTrace();}
    }
    @Override
    public void initProduct() {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        ClassLoader classLoader = getClass().getClassLoader();

        try {
            List<ProductReqDto> list = Arrays.asList(objectMapper.readValue(new File(classLoader.getResource("json/product.json").getFile()), ProductReqDto[].class));
            for (ProductReqDto d : list) {
                Product product = Product.builder()
                        .name(d.getName())
                        .price(d.getPrice())
                        .rfid(d.getRfid())
                        .barcode(d.getBarcode())
                        .isAdult(d.getIsAdult())
                        .image(d.getImage())
                        .build();
                if (d.getManuId() != null) {
                    Manufacturer manufacturer = manufacturerJPARepository.findById(d.getManuId())
                            .orElseThrow(() -> new CommonException(2, "Manufacturer객체가 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR));
                    product.setManufacturersAndProducts(manufacturer);
                }
                if (d.getCategoryId() != null) {
                    ProductCategory productCategory = productCategoryJPARepository.findById(d.getCategoryId())
                            .orElseThrow(() -> new CommonException(2, "ProductCategory객체가 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR));
                    product.setProductCategoriesAndProducts(productCategory);
                }
                productJPARepository.save(product);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    @Override
    public void initPayDetail() {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        ClassLoader classLoader = getClass().getClassLoader();
        try {
            List<PayDetailReqDto> list = Arrays.asList(objectMapper.readValue(new File(classLoader.getResource("json/payDetail.json").getFile()), PayDetailReqDto[].class));
            for (PayDetailReqDto d : list) {
                PayDetail payDetail = PayDetail.builder()
                        .count(d.getCount())
                        .price(d.getPrice())
                        .productName(d.getProductName())
                        .build();
                if (d.getBranchId() != null) {
                    Branch branch = branchJPARepository.findById(d.getBranchId())
                            .orElseThrow(() -> new CommonException(2, "Branch객체가 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR));
                    payDetail.setBranchAndPayDetail(branch);
                }
                if (d.getPayId() != null) {
                    Pay pay = payJPARepository.findById(d.getPayId())
                            .orElseThrow(() -> new CommonException(2, "Pay객체가 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR));
                    payDetail.setPayAndPayDetail(pay);
                }
                if (d.getProductId() != null) {
                    Product product = productJPARepository.findById(d.getProductId())
                            .orElseThrow(() -> new CommonException(2, "Product객체가 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR));
                    payDetail.setProductAndPayDetail(product);
                }
                payDetailJPARepository.save(payDetail);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

