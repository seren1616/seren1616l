package com.example.demo.api.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.example.demo.api.service.ApiService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;


@ApiResponses({
	@ApiResponse(code = 200, message = "success"),
	@ApiResponse(code = 404, message = "page not found!!!")
})


@RestController
@RequestMapping(value="/api/user")
@Api(value = "userController", basePath = "/user", tags = {"ȸ������ ���� API(CRUD)"}, description = "ȸ������ ���� API")
@RequiredArgsConstructor
public class ApiLoginController {
	
	private ModelAndView mv;
	private String returnPath;
	private String returnStr;
	private ApiResponse status;
	private ApiResponse response = null;
	private Map<String, String> map=new HashMap<>();
	
	
	@Autowired
	private ApiService apiService;
	
	
	@ApiOperation(value = "ȸ������", notes="user�� id�� pw�� �ű� user�� �����մϴ�.")
	@PostMapping(value="/join")
	public ResponseEntity<String> join(@ApiParam(value = "user id", required = true) @RequestParam String userId,
			@ApiParam(value="user pw", required=true) @RequestParam String userPw,
			@ApiParam(value="email", required=true) @RequestParam String eMail
			) 
	{
		
		/*
		 * map.put("userId", userId); map.put("userPw", userPw);
		 * System.out.println(map); //List<AssetJoinVO> list apiService.joinUser(map);
		 * //response = new ApiResponse();
		 */		
		
		this.map.put("userId", userId);
		this.map.put("userPw", userPw);
		this.map.put("eMail", eMail);
		
		apiService.joinUser(this.map);
		return new ResponseEntity<>(HttpStatus.OK);
		
	}
	
	@ApiOperation(value="ȸ�� ��ȸ", notes="user�� id�� user�� ������ ��ȸ�մϴ�.")
	@GetMapping(value="/select/{userId}")
	public void select(@PathVariable("userId") String userId) 
	{
		System.out.println("select * from aduser where userId="+userId);
	}
	
	@ApiOperation(value="id�ߺ��˻�",notes="id �ߺ��˻縦 �մϴ�.")
	@PostMapping(value="/validChk")
	public int validChk(@ApiParam(value = "user id", required = true) @RequestParam String userId,HttpServletRequest hsp) 
	{
		System.out.println("valid check "+userId+hsp.getParameter("userId"));
		return apiService.countExistId(userId);
	
	}
	
}
