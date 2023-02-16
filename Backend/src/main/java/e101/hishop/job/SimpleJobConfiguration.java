//package e101.hishop.job;
//
//import e101.hishop.domain.entity.Branch;
//import e101.hishop.service.AdminService;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.batch.core.Job;
//import org.springframework.batch.core.Step;
//import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
//import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
//import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
//import org.springframework.batch.core.launch.support.RunIdIncrementer;
//import org.springframework.batch.item.database.JdbcBatchItemWriter;
//import org.springframework.batch.item.database.JdbcCursorItemReader;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//@Slf4j // log 사용을 위한 lombok 어노테이션
//@RequiredArgsConstructor // 생성자 DI를 위한 lombok 어노테이션
//@Configuration
//@EnableBatchProcessing
//public class SimpleJobConfiguration {
//    private final JobBuilderFactory jobBuilderFactory; // 생성자 DI 받음
//    private final StepBuilderFactory stepBuilderFactory; // 생성자 DI 받음
//    private final AdminService adminService;
//    private JdbcCursorItemReader<Branch> mysqlReader;
//    private JdbcBatchItemWriter<Branch> sqliteWriter;
//
//
//
//    @Bean
//    public Step migrationStep() {
//        return stepBuilderFactory.get("migrationStep")
//                .<Branch, Branch>chunk(10)
//                .reader(mysqlReader)
//                .writer(sqliteWriter)
//                .build();
//    }
//
//    @Bean
//    public Job simpleJob() {
//        return jobBuilderFactory.get("simpleJob")
//                .incrementer(new RunIdIncrementer())
//                .start(migrationStep())
////                .next(jpaTest())
//                .build();
//    }
//}