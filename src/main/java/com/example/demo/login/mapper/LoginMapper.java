package com.example.demo.login.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.Query;

@Mapper
public interface LoginMapper {
	
	List<?> selectAllInfo() throws Exception;
	Map<?,?> selectInfo(String userId) throws Exception;
	
	 @Query("select u from UserVO u where u.userId=:userId and u.password=:password")
	 Map<?,?> selectInfo(@Param("userId")String userId,@Param("userPw")String userPw);


}
