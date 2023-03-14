package e101.hishop.service;

import e101.hishop.domain.dto.request.*;
import e101.hishop.domain.dto.response.*;
import e101.hishop.domain.entity.*;
import e101.hishop.global.common.CommonException;
import e101.hishop.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Transactional
@Service
@RequiredArgsConstructor
@Slf4j
public class AdminServiceImpl implements AdminService {
    private final UserJPARepository userJPARepository;
    private final PayJPARepository payJPARepository;
    private final PayDetailJPARepository payDetailJPARepository;
    private final StaffJPARepository staffJPARepository;
    private final CardJPARepository cardJPARepository;
    private final KioskJPARepository kioskJPARepository;
    private final ProductJPARepository productJPARepository;
    private final BranchJPARepository branchJPARepository;
    private final PointJPARepository pointJPARepository;
    private final ManufacturerJPARepository manufacturerJPARepository;
    private final ProductCategoryJPARepository productCategoryJPARepository;
    private final SaleReportJPARepository saleReportJPARepository;
    private final UserReportJPARepository userReportJPARepository;
    private WebClient webClient;

    @Override
    public Pay savePay(Pay pays, Long userId) {
        User user = userJPARepository.findById(userId)
                .orElseThrow(() -> new CommonException(2, "Pays객체가 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR));
        //TODO setter 삭제하고 의도있게 작성
        pays.setUsersAndPay(user);
        return payJPARepository.save(pays);
    }

    @Override
    public List<PayInfoRespDto> getPayInfo() {
        return payJPARepository.findAll().stream()
                .map(PayInfoRespDto::of)
                .collect(Collectors.toList());
    }

    @Override
    public List<PayDetailInfoRespDto> getPayDetail(Long buyId) {
        List<PayDetail> payDetails = payDetailJPARepository.findAllByPayId(buyId);
        List<PayDetailInfoRespDto> payDetailList = new ArrayList<>();
        for (PayDetail p: payDetails) {
            payDetailList.add(PayDetailInfoRespDto.of(p));
        }
        return payDetailList;
    }

    @Override
    public List<ProductRespDto> getProduct() {
        List<Product> products = productJPARepository.findAll();
        List<ProductRespDto> productList = new ArrayList<>();
        for (Product p: products) {
            productList.add(ProductRespDto.of(p));
        }
        return productList;
    }

    @Override
    public ProductRespDto getProductDetail(Long productId) {
        Product product = productJPARepository.findById(productId)
                .orElseThrow(() -> new CommonException(2, "Product가 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR));
        return ProductRespDto.of(product);
    }

    public Long editProduct(ProductEditReqDto dto, Long productId) {
        Boolean result = productJPARepository.existsByName(dto.getName());
        Boolean result2 = productJPARepository.existsByRfid(dto.getRfid());
        Boolean result3 = productJPARepository.existsByBarcode(dto.getBarcode());
        if (result) throw new CommonException(1, "이름이 중복됩니다.", HttpStatus.BAD_REQUEST);
        if (result2) throw new CommonException(1, "RFID가 중복됩니다.", HttpStatus.BAD_REQUEST);
        if (result3) throw new CommonException(1, "barcode가 중복됩니다.", HttpStatus.BAD_REQUEST);

        return productJPARepository.findById(productId)
                .orElseThrow(() -> new CommonException(2, "Product가 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR))
                .updateProduct(dto)
                .getId();
    }

    public void deleteProduct(Long productId) {
        productJPARepository.findById(productId)
                .orElseThrow(() -> new CommonException(2, "Product가 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR));
        List<PayDetail> payDetails = payDetailJPARepository.findAllByProductId(productId);
        for (PayDetail p: payDetails) {
            p.setProduct(null);
        }
        productJPARepository.deleteById(productId);
    }

    @Override
    public Product saveProduct(Product product, Long manuId, Long categoryId) {
        Boolean result = productJPARepository.existsByName(product.getName());
        Boolean result2 = productJPARepository.existsByRfid(product.getRfid());
        Boolean result3 = productJPARepository.existsByBarcode(product.getBarcode());
        if (result) throw new CommonException(1, "이름이 중복됩니다.", HttpStatus.BAD_REQUEST);
        if (result2) throw new CommonException(1, "RFID가 중복됩니다.", HttpStatus.BAD_REQUEST);
        if (result3) throw new CommonException(1, "barcode가 중복됩니다.", HttpStatus.BAD_REQUEST);
        Manufacturer manufacturer = manufacturerJPARepository.findById(manuId)
                .orElseThrow(() -> new CommonException(2, "Manufacturer객체가 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR));
        product.setManufacturersAndProducts(manufacturer);
        ProductCategory productCategory = productCategoryJPARepository.findById(categoryId)
                .orElseThrow(() -> new CommonException(2, "ProductCategory객체가 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR));
        product.setProductCategoriesAndProducts(productCategory);
        return productJPARepository.save(product);
    }

    public List<UserInfoRespDto> getUsers() {
        List<User> users = userJPARepository.findAll();
        List<UserInfoRespDto> userList = new ArrayList<>();

        for (User p: users) {
            UserInfoRespDto user = UserInfoRespDto.of(p);
            List<String> cardNb = new ArrayList<>();
            List<Card> list = cardJPARepository.findAllByUserId(user.getId());
            for (Card c : list) {
                log.info("CARD_INFO=========================================================");
                log.info("{}", c);
                cardNb.add(c.getCardNo());
            }
            user.setCards(cardNb);
            userList.add(user);
        }
        return userList;
    }

    @Override
    public UserInfoRespDto getUser(Long userId) {
        User user = userJPARepository.findById(userId)
                .orElseThrow(() -> new CommonException(2, "User가 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR));
        List<String> cardNb = new ArrayList<>();
        List<Card> list = cardJPARepository.findAllByUserId(userId);
        for (Card p : list) {
            log.info("CARD_INFO=========================================================");
            log.info("{}", p);
            cardNb.add(p.getCardNo());
        }
        UserInfoRespDto resp = UserInfoRespDto.of(user);
        resp.setCards(cardNb);

        return resp;
    }

    @Override
    public Long modifyUser(UserInfoReqDto dto, Long userId) {
        Boolean result = userJPARepository.existsByLoginId(dto.getLoginId());
        if (result) throw new CommonException(1, "이름이 중복됩니다.", HttpStatus.BAD_REQUEST);
        return userJPARepository.findById(userId)
                .orElseThrow(() -> new CommonException(2, "User가 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR))
                .updateUserInfoByAdmin(dto)
                .getId();
    }

    public void deleteUser(Long userId) {
        userJPARepository.findById(userId)
                .orElseThrow(() -> new CommonException(2, "User가 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR));
        List<Pay> pays = payJPARepository.findAllByUserId(userId);
        for (Pay p: pays) {
            p.setUser(null);
        }

        userJPARepository.deleteById(userId);
    }
    @Override
    public List<StaffRespDto> getStaff() {
        List<Staff> staff = staffJPARepository.findAll();
        List<StaffRespDto> staffList = new ArrayList<>();
        for (Staff p: staff) {
            staffList.add(StaffRespDto.of(p));
        }
        return staffList;
    }
    @Override
    public StaffRespDto getStaffDetail(Long employeeId) {
        Staff staff = staffJPARepository.findById(employeeId)
                .orElseThrow(() -> new CommonException(2, "직원이 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR));
        return StaffRespDto.of(staff);
    }
    @Override
    public Long modifyStaff(StaffEditReqDto dto, Long employeeId) {
        Boolean result = staffJPARepository.existsByStaffLoginId(dto.getStaffLoginId());
        if (result) throw new CommonException(1, "아이디가 중복됩니다.", HttpStatus.BAD_REQUEST);
        Staff staff = staffJPARepository.findById(employeeId)
                .orElseThrow(() -> new CommonException(2, "직원이 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR));
        Branch oldBranch = staff.getBranch();
        Branch newBranch = branchJPARepository.findById(dto.getBranchId())
                .orElseThrow(() -> new CommonException(2, "Branch가 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR));
            oldBranch.getStaff().remove(staff);
            staff.setBranchAndStaff(newBranch);
        return staff.updateStaff(dto)
                .getId();
    }
    public void deleteStaff(Long employeeId) {
        staffJPARepository.deleteById(employeeId);
    }

    @Override
    public Staff saveStaff(Staff staff, Long branchId) {
        //TODO Exception
        Boolean result = staffJPARepository.existsByStaffLoginId(staff.getStaffLoginId());
        if (result) throw new CommonException(1, "아이디가 중복됩니다.", HttpStatus.BAD_REQUEST);
        Branch branch = branchJPARepository.findById(branchId)
                .orElseThrow(() -> new CommonException(2, "Branch가 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR));
        staff.setBranchAndStaff(branch);
        return staffJPARepository.save(staff);
    }
    @Override
    public PayDetail savePayDetail(PayDetail payDetail, Long payId, Long productId, Long branchId) {
        //TODO Exception
        Pay pay = payJPARepository.findById(payId)
                .orElseThrow(() -> new CommonException(2, "Pay가 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR));
        Product product = productJPARepository.findById(productId)
                .orElseThrow(() -> new CommonException(2, "Product가 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR));;
        Branch branch = branchJPARepository.findById(branchId)
                .orElseThrow(() -> new CommonException(2, "Branch가 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR));
        payDetail.setPayAndPayDetail(pay);
        payDetail.setProductAndPayDetail(product);
        payDetail.setBranchAndPayDetail(branch);
        return payDetailJPARepository.save(payDetail);
    }

    @Override
    public List<BranchRespDto> getBranchs() {
        List<Branch> branches = branchJPARepository.findAll();
        List<BranchRespDto> branchList = new ArrayList<>();
        for (Branch p: branches) {
            branchList.add(BranchRespDto.of(p));
        }
        return branchList;
    }
    @Override
    public BranchRespDto getBranch(Long branchId) {
        Branch branch = branchJPARepository.findById(branchId)
                .orElseThrow(() -> new CommonException(2, "Branch가 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR));
        return BranchRespDto.of(branch);
    }

    @Override
    public Long modifyBranch(BranchReqDto dto, Long branchId) {
        return branchJPARepository.findById(branchId)
                .orElseThrow(() -> new CommonException(2, "Branch가 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR))
                .updateBranch(dto)
                .getId();
    }

    public void deleteBranch(Long branchId) {
        List<Staff> staffs = staffJPARepository.findAllByBranchId(branchId);
        for (Staff p: staffs) {
            p.setBranch(null);
        }
        branchJPARepository.deleteById(branchId);
    }
    @Override
    public Branch saveBranch(Branch branch) { return branchJPARepository.save(branch); }

    @Override
    public Kiosk saveKiosk(Kiosk kiosk, Long branchId) {
        Branch branch = branchJPARepository.findById(branchId)
                .orElseThrow(() -> new CommonException(2, "Branch가 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR));
        kiosk.setBranchAndKiosk(branch);
        return kioskJPARepository.save(kiosk);
    }

    @Override
    public List<PointRespDto> getPoints() {
        List<Point> points = pointJPARepository.findAll();
        List<PointRespDto> pointList = new ArrayList<>();
        for (Point p: points) {
            pointList.add(PointRespDto.of(p));
        }
        return pointList;
    }

    @Override
    public PointRespDto getPoint(Long pointId) {
        Point point = pointJPARepository.findById(pointId)
                .orElseThrow(() -> new CommonException(2, "User객체가 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR));
        return PointRespDto.of(point);
    }

    @Override
    public Point savePoint(Point point, Long userId) {
        User user = userJPARepository.findById(userId)
                .orElseThrow(() -> new CommonException(2, "Branch객체가 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR));
        point.setUsersAndPoints(user);
        return pointJPARepository.save(point);
    }

    @Override
    public Long modifyPoint(PointReqDto dto, Long pointId) {
        return pointJPARepository.findById(pointId)
                .orElseThrow(() -> new CommonException(2, "User객체가 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR))
                .updatePoint(dto)
                .getId();
    }

    public void deletePoint(Long pointId) { pointJPARepository.deleteById(pointId); }

    @Override
    public List<ManufacturerRespDto> getManufacturers() {
        List<Manufacturer> manufacturers = manufacturerJPARepository.findAll();
        List<ManufacturerRespDto> manufacturerList = new ArrayList<>();
        for (Manufacturer p: manufacturers) {
            manufacturerList.add(ManufacturerRespDto.of(p));
        }
        return manufacturerList;
    }

    @Override
    public ManufacturerRespDto getManufacturer(Long manuId) {
        Manufacturer manufacturer = manufacturerJPARepository.findById(manuId)
                .orElseThrow(() -> new CommonException(2, "manufacturer가 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR));
        return ManufacturerRespDto.of(manufacturer);
    }

    @Override
    public Manufacturer saveManufacturer(Manufacturer manufacturer) {
        return manufacturerJPARepository.save(manufacturer);
    }

    @Override
    public Long modifyManufacturer(ManufacturerReqDto dto, Long manuId) {
        return manufacturerJPARepository.findById(manuId)
                .orElseThrow(() -> new CommonException(2, "manufacturer가 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR))
                .updateManufacturer(dto)
                .getId();
    }

    public void deleteManufacturer(Long manuId) {
        List<Product> products = productJPARepository.findAllByManufacturerId(manuId);
        for (Product p: products) {
            p.setManufacturer(null);
        }
        manufacturerJPARepository.deleteById(manuId);
    }

    @Override
    public List<ProductCategoryRespDto> getProductCategories() {
        List<ProductCategory> productcategories = productCategoryJPARepository.findAll();
        List<ProductCategoryRespDto> productCategoryList = new ArrayList<>();
        for (ProductCategory p: productcategories) {
            productCategoryList.add(ProductCategoryRespDto.of(p));
        }
        return productCategoryList;
    }

    @Override
    public ProductCategoryRespDto getProductCategory(Long categoryId) {
        ProductCategory productCategory = productCategoryJPARepository.findById(categoryId)
                .orElseThrow(() -> new CommonException(2, "User객체가 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR));
        return ProductCategoryRespDto.of(productCategory);
    }

    @Override
    public ProductCategory saveProductCategory(ProductCategory productCategory) {
        return productCategoryJPARepository.save(productCategory);
    }

    @Override
    public Long modifyProductCategory(ProductCategoryReqDto dto, Long categoryId) {
        return productCategoryJPARepository.findById(categoryId)
                .orElseThrow(() -> new CommonException(2, "User객체가 존재하지 않습니다.", HttpStatus.INTERNAL_SERVER_ERROR))
                .updateProductCategory(dto)
                .getId();
    }

    public void deleteProductCategory(Long categoryId) {
        List<Product> products = productJPARepository.findAllByProductCategoryId(categoryId);
        for (Product p: products) {
            p.setProductCategory(null);
        }
        productCategoryJPARepository.deleteById(categoryId);
    }
    @Override
    public List<SaleReportRespDto> saleReport() {
        List<SaleReport> saleReports = saleReportJPARepository.findAll();
        List<SaleReportRespDto> saleReportList = new ArrayList<>();
        for (SaleReport p: saleReports) {
            saleReportList.add(SaleReportRespDto.of(p));
        }
        return saleReportList;
    }
    @Override
    public List<UserReportRespDto> userReport() {
        List<UserReport> userReports = userReportJPARepository.findAll();
        List<UserReportRespDto> userReportList = new ArrayList<>();
        for (UserReport p: userReports) {
            userReportList.add(UserReportRespDto.of(p));
        }
        return userReportList;
    }

    @Override
    public String migration() {
        List<Product> products = productJPARepository.findAll();
        List<MigrationProductRespDto> productList = new ArrayList<>();
        for (Product p : products) {
            productList.add(MigrationProductRespDto.of(p));
        }
        MigrationRespDto migrationRespDto = MigrationRespDto.builder()
                .productList(productList)
                .build();
        webClient = WebClient.create(sys.getEnv(url);
        Mono<String> response = webClient.post()
                .uri("/api/db")
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromObject(migrationRespDto))
                .retrieve()
                .bodyToMono(String.class);
        return response.block();
    }

}