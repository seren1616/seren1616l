package com.example.demo;

import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

@Configuration
@SpringBootApplication
public class ShoppingmallApplication {

	public static void main(String[] args) {
		SpringApplication.run(ShoppingmallApplication.class, args);
	}
	
	public SqlSessionFactory sqlSessionFactory(DataSource dataSource) throws Exception
	{
		SqlSessionFactoryBean sqlSessionFactoryBean=new SqlSessionFactoryBean();
		sqlSessionFactoryBean.setDataSource(dataSource);
		Resource [] res=new PathMatchingResourcePatternResolver().getResources("classpath:mappers/*Mapper.xml");
		sqlSessionFactoryBean.setMapperLocations(res);
		return sqlSessionFactoryBean.getObject();
	}
	



}
