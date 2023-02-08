package e101.hishop.controller;

import e101.hishop.domain.dto.request.*;
import e101.hishop.domain.dto.response.*;
import e101.hishop.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/pays")
  public ResponseEntity<List<PayInfoRespDto>> pays() {
        return new ResponseEntity<>(adminService.getPayInfo(), HttpStatus.OK);
    }

    @GetMapping("/pays/{buyId}")
    public ResponseEntity<List<PayDetailInfoRespDto>> paysDetail(@PathVariable Long buyId) {
        return new ResponseEntity<>(adminService.getPayDetail(buyId), HttpStatus.OK);
    }

    @GetMapping("/product")
    public ResponseEntity<List<ProductRespDto>> products() {
        return new ResponseEntity<>(adminService.getProduct(), HttpStatus.OK);
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<ProductRespDto> productDetail(@PathVariable Long productId) {
        return new ResponseEntity<>(adminService.getProductDetail(productId), HttpStatus.OK);
    }

    @PatchMapping("/product/{productId}")
    public ResponseEntity<String> productModify(@RequestBody ProductEditReqDto dto, @PathVariable Long productId) {
        adminService.editProduct(dto, productId);
        return new ResponseEntity<>("수정완료", HttpStatus.OK);
    }

    @PostMapping("/product")
    public ResponseEntity<String> productCreate(@RequestBody ProductReqDto dto) {
        Long manuId = dto.getManuId();
        adminService.saveProduct(dto.toProductEntity(), manuId);
        return new ResponseEntity<>("저장완료", HttpStatus.OK);
    }

    @DeleteMapping("/product/{productId}")
    public ResponseEntity<String> productDelete(@PathVariable Long productId) {
        adminService.deleteProduct(productId);
        return new ResponseEntity<>("제거완료", HttpStatus.OK);
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserInfoRespDto>> users() {
        return new ResponseEntity<>(adminService.getUsers(), HttpStatus.OK);
    }

    @GetMapping("/users/{userId}")
    public ResponseEntity<UserInfoRespDto> userDetail(@PathVariable Long userId) {
        return new ResponseEntity<>(adminService.getUser(userId), HttpStatus.OK);
    }

    @PatchMapping("/users/{userId}")
    public ResponseEntity<String> userModify(@RequestBody UserInfoReqDto dto, @PathVariable Long userId) {
        adminService.modifyUser(dto, userId);
        return new ResponseEntity<>("수정완료", HttpStatus.OK);
    }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<String> userDelete(@PathVariable Long userId) {
        adminService.deleteUser(userId);
        return new ResponseEntity<>("제거완료", HttpStatus.OK);
    }

    @GetMapping("/employees")
    public ResponseEntity<List<StaffRespDto>> employees() {
        return new ResponseEntity<>(adminService.getStaff(), HttpStatus.OK);
    }

    @GetMapping("/employees/{employeeId}")
    public ResponseEntity<StaffRespDto> employeeDetail(@PathVariable Long employeeId) {
        return new ResponseEntity<>(adminService.getStaffDetail(employeeId), HttpStatus.OK);
    }

    @PatchMapping("/employees/{employeeId}")
    public ResponseEntity<String> employeeModify(@RequestBody StaffReqDto dto, @PathVariable Long employeeId) {
        //TODO 지점 변경?
        adminService.modifyStaff(dto, employeeId);
        return new ResponseEntity<>("수정완료", HttpStatus.OK);
    }

    @PostMapping("/employees")
    public ResponseEntity<String> employeeCreate(@RequestBody StaffReqDto dto) {
        Long branchId = dto.getBranchId();
        adminService.saveStaff(dto.toStaffEntity(), branchId);
        return new ResponseEntity<>("생성완료", HttpStatus.OK);
    }

    @DeleteMapping("/employees/{employeeId}")
    public ResponseEntity<String> employeeDelete(@PathVariable Long employeeId) {
        adminService.deleteStaff(employeeId);
        return new ResponseEntity<>("제거완료", HttpStatus.OK);
    }

    @GetMapping("/branch")
    public ResponseEntity<List<BranchRespDto>> branchs() {
        return new ResponseEntity<>(adminService.getBranchs(), HttpStatus.OK);
    }

    @GetMapping("/branch/{branchId}")
    public ResponseEntity<BranchRespDto> branch(@PathVariable Long branchId) {
        return new ResponseEntity<>(adminService.getBranch(branchId), HttpStatus.OK);
    }

    @PatchMapping("/branch/{branchId}")
    public ResponseEntity<String> branchModify(@RequestBody BranchReqDto dto, @PathVariable Long branchId) {
        //TODO 지점 변경?
        adminService.modifyBranch(dto, branchId);
        return new ResponseEntity<>("수정완료", HttpStatus.OK);
    }

    @PostMapping("/branch")
    public ResponseEntity<String> branchCreate(@RequestBody BranchReqDto dto) {
        adminService.saveBranch(dto.toBranchEntity());
        return new ResponseEntity<>("생성완료", HttpStatus.OK);
    }

    @DeleteMapping("/branch/{branchId}")
    public ResponseEntity<String> branchDelete(@PathVariable Long branchId) {
        adminService.deleteBranch(branchId);
        return new ResponseEntity<>("제거완료", HttpStatus.OK);
    }

    @GetMapping("/point")
    public ResponseEntity<List<PointRespDto>> points() {
        return new ResponseEntity<>(adminService.getPoints(), HttpStatus.OK);
    }

    @GetMapping("/point/{pointId}")
    public ResponseEntity<PointRespDto> pointDetail(@PathVariable Long pointId) {
        return new ResponseEntity<>(adminService.getPoint(pointId), HttpStatus.OK);
    }

    @PostMapping("/point")
    public ResponseEntity<String> savePoint(@RequestBody PointReqDto dto) {
        Long userId = dto.getUserId();
        adminService.savePoint(dto.toPointEntity(), userId);
        return new ResponseEntity<>("저장완료", HttpStatus.OK);
    }

    @PatchMapping("/point/{pointId}")
    public ResponseEntity<String> pointModify(@RequestBody PointReqDto dto, @PathVariable Long pointId) {
        //TODO 지점 변경?
        adminService.modifyPoint(dto, pointId);
        return new ResponseEntity<>("수정완료", HttpStatus.OK);
    }

    @DeleteMapping("/point/{pointId}")
    public ResponseEntity<String> pointDelete(@PathVariable Long pointId) {
        adminService.deletePoint(pointId);
        return new ResponseEntity<>("제거완료", HttpStatus.OK);
    }

    @GetMapping("/manufacturer")
    public ResponseEntity<List<ManufacturerRespDto>> manufacturers() {
        return new ResponseEntity<>(adminService.getManufacturers(), HttpStatus.OK);
    }

    @GetMapping("/manufacturer/{manuId}")
    public ResponseEntity<ManufacturerRespDto> manufacturerDetail(@PathVariable Long manuId) {
        return new ResponseEntity<>(adminService.getManufacturer(manuId), HttpStatus.OK);
    }

    @PostMapping("/manufacturer")
    public ResponseEntity<String> saveManufacturer(@RequestBody ManufacturerReqDto dto) {
        adminService.saveManufacturer(dto.toManufacturerEntity());
        return new ResponseEntity<>("저장완료", HttpStatus.OK);
    }

    @PatchMapping("/manufacturer/{manuId}")
    public ResponseEntity<String> manufacturerModify(@RequestBody ManufacturerReqDto dto, @PathVariable Long manuId) {
        adminService.modifyManufacturer(dto, manuId);
        return new ResponseEntity<>("수정완료", HttpStatus.OK);
    }

    @DeleteMapping("/manufacturer/{manuId}")
    public ResponseEntity<String> manufacturerDelete(@PathVariable Long manuId) {
        adminService.deleteManufacturer(manuId);
        return new ResponseEntity<>("제거완료", HttpStatus.OK);
    }
}
