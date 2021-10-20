package com.example.demo.login.service.Impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.login.mapper.LoginMapper;
import com.example.demo.login.service.LoginService;

@Service
public class LoginServiceImpl implements LoginService {
	
	@Autowired
	private LoginMapper loginMapper;
	
	
	public List<?> selectAllInfo() throws Exception
	{
		System.out.println("why!?");
		List<?> list=loginMapper.selectAllInfo();
		return list;
	}
	
	public Map<?,?> selectInfo(String userId,String userPw) throws Exception
	{
		System.out.println("why!?");
		Map<?,?> map=loginMapper.selectInfo(userId,userPw);
		return map;
	}
}
