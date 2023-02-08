package e101.hishop.service;

import e101.hishop.domain.dto.request.*;
import e101.hishop.domain.dto.response.*;
import e101.hishop.domain.entity.*;

import java.util.List;

public interface AdminService {
    Pay savePay(Pay pays, Long userId);

    List<PayInfoRespDto> getPayInfo();
    List<PayDetailInfoRespDto> getPayDetail(Long buyId);
    List<ProductRespDto> getProduct();
    ProductRespDto getProductDetail(Long productId);
    Long editProduct(ProductReqDto dto, Long productId);
    void deleteProduct(Long productId);
    Product saveProduct(Product product, Long manuId);
    PayDetail savePayDetail(PayDetail payDetail, Long payId, Long productId, Long branchId);
    List<UserInfoRespDto> getUsers();
    UserInfoRespDto getUser(Long userId);
    Long modifyUser(UserInfoReqDto dto, Long userId);
    void deleteUser(Long userId);
    List<StaffRespDto> getStaff();
    StaffRespDto getStaffDetail(Long employeeId);
    Long modifyStaff(StaffReqDto dto, Long employeeId);
    void deleteStaff(Long employeeId);
    List<BranchRespDto> getBranchs();
    BranchRespDto getBranch(Long branchId);
    Long modifyBranch(BranchReqDto dto, Long branchId);
    void deleteBranch(Long branchId);
    Branch saveBranch(Branch branch);
    Staff saveStaff(Staff staff, Long branchId);
    Kiosk saveKiosk(Kiosk kiosk, Long branchId);
    Point savePoint(Point point, Long userId);
    List<PointRespDto> getPoints();
    PointRespDto getPoint(Long pointId);
    Long modifyPoint(PointReqDto dto, Long pointId);
    void deletePoint(Long pointId);
    List<ManufacturerRespDto> getManufacturers();
    ManufacturerRespDto getManufacturer(Long manuId);
    Manufacturer saveManufacturer(Manufacturer manufacturer);
    Long modifyManufacturer(ManufacturerReqDto dto, Long manuId);
    void deleteManufacturer(Long manuId);
//    List<ProductCategoryRespDto> getProductCategorys();
//    ProductCategoryRespDto getProductCategory(Long manuId);
//    ProductCategory saveProductCategory(ProductCategory manufacturer);
//    Long modifyProductCategory(ProductCategoryReqDto dto, Long manuId);
//    void deleteProductCategory(Long manuId);
}
