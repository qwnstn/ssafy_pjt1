package e101.hishop.init;

import e101.hishop.repository.*;
import e101.hishop.service.AdminService;
import e101.hishop.service.AuthService;
import e101.hishop.service.DataInit;
import e101.hishop.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

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
    private BranchJPARepository branchJPARepository;
    @Autowired
    private ManufacturerJPARepository manufacturerJPARepository;
    @Autowired
    private CardCategoryJPARepository cardCategoryJPARepository;
    @Autowired
    private PointJPARepository pointJPARepository;

    @Autowired
    private AdminService adminService;

    @Autowired
    private DataInit dataInit;

    //method invoked during the startup
    @PostConstruct
    public void loadData(){

        dataInit.initUser();
        dataInit.initCardCategory();
        dataInit.initCard();
        dataInit.initPoint();
        dataInit.initPay();
        dataInit.initBranch();
        dataInit.initStaff();
        dataInit.initKiosk();
        dataInit.initManufacturer();
        dataInit.initProductCategory();
        dataInit.initProduct();
        dataInit.initPayDetail();
        dataInit.inituserReport();
        dataInit.initsaleReport();


}