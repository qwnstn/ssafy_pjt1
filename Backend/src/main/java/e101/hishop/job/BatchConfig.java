//package e101.hishop.job;
//
//import e101.hishop.domain.entity.Branch;
//import org.springframework.batch.item.database.BeanPropertyItemSqlParameterSourceProvider;
//import org.springframework.batch.item.database.JdbcBatchItemWriter;
//import org.springframework.batch.item.database.JdbcCursorItemReader;
//import org.springframework.batch.item.database.builder.JdbcBatchItemWriterBuilder;
//import org.springframework.batch.item.database.builder.JdbcCursorItemReaderBuilder;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.jdbc.datasource.DriverManagerDataSource;
//
//import javax.sql.DataSource;
//
//@Configuration
////@EnableBatchProcessing
//public class BatchConfig {
//    @Bean
//    public DataSource mysqlDataSource() {
//        DriverManagerDataSource dataSource = new DriverManagerDataSource();
//        dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
//        dataSource.setUrl("jdbc:mysql://13.125.42.187:3306/hishop?serverTimezone=Asia/Seoul&characterEncoding=UTF-8");
//        dataSource.setUsername("root");
//        dataSource.setPassword("e101ssafy!@");
//        return dataSource;
//    }
//
//    @Bean
//    public DataSource sqliteDataSource() {
//        DriverManagerDataSource dataSource = new DriverManagerDataSource();
////        dataSource.setDriverClassName("org.sqlite.JDBC");
////        dataSource.setUrl("jdbc:sqlite:i8e101.p.ssafy.io/sqlite.db");
//        dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
//        dataSource.setUrl("jdbc:mysql://localhost:3306/hishop?serverTimezone=Asia/Seoul&characterEncoding=UTF-8");
//        dataSource.setUsername("e101");
//        dataSource.setPassword("e101ssafy!@");
//        return dataSource;
//    }
//
//    @Bean
//    public JdbcCursorItemReader<Branch> mysqlReader() {
//        return new JdbcCursorItemReaderBuilder<Branch>()
//                .dataSource(mysqlDataSource())
//                .name("mysqlReader")
//                .sql("SELECT id, branch_name, region FROM branch")
//                .build();
//    }
//
//    @Bean
//    public JdbcBatchItemWriter<Branch> sqliteWriter() {
//        return new JdbcBatchItemWriterBuilder<Branch>()
//                .dataSource(sqliteDataSource())
//                .sql("INSERT INTO branch (id, branch_name, region) VALUES :id :branch_name :region")
//                .itemSqlParameterSourceProvider(new BeanPropertyItemSqlParameterSourceProvider<>())
//                .build();
//    }
//}
