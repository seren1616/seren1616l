package com.example.demo.login.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public interface LoginService {
	
	List<?> selectAllInfo() throws Exception;
	Map<?, ?> selectInfo(String userId,String userPw) throws Exception;
}
