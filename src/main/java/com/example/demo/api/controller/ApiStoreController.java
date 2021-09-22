package com.example.demo.api.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.api.service.ApiService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@Controller
@RequestMapping(value="/store")
@Api(value="storeController", basePath="/store", tags= {"store ���� API(CRUD)"}, description="store ���� API")
public class ApiStoreController 
{

	@Autowired
	private ApiService apiService;
	
	@ApiOperation(value = "�ű�store���", notes="�ű� store�� name���� ����մϴ�.")
	@PostMapping(value="/add")
	public void addNewStore(@ApiParam(value="store id", required=true) @RequestParam String storeName) 
	{
		System.out.println("store name is : "+storeName);
		Map<String,String> map=new HashMap<>();
		map.put("storeName", storeName);
		apiService.addNewStore(map);
		
	}
}
