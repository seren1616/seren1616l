package com.example.demo.api.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.api.mapper.ApiMapper;
import com.example.demo.api.service.ApiService;

@Service
public class ApiServiceImpl implements ApiService{

	@Autowired
	private ApiMapper apiMapper;
	
	public String joinUser(Map<?,?> info) 
	{
		apiMapper.insertAdinfo(info);
		return "success";
	}
	
	public String addNewStore(Map<?,?> info) 
	{
		apiMapper.insertStoreInfoMst(info);
		return "success";
	}
	
	public int countExistId(String userId) 
	{
		System.out.println("¾Æ³ö");
		int cnt=apiMapper.countExistId(userId);
		return cnt;
	}
	
}
