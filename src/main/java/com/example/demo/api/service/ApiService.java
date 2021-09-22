package com.example.demo.api.service;

import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public interface ApiService 
{

	 String joinUser(Map<?,?> info);
	 
	 String addNewStore(Map<?,?> info);
	 
	 int countExistId(String userId);
	
}
