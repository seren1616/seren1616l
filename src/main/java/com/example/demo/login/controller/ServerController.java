package com.example.demo.login.controller;				
				
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.api.service.ApiService;
import com.example.demo.board.service.BoardService;
import com.example.demo.login.service.LoginService;				
				
@CrossOrigin(origins = "http://localhost:3000")				
@RestController							
public class ServerController {				
				
				
	@Autowired			
	private LoginService loginService;
	private BoardService boardService;
	private ApiService apiService;
				
	@RequestMapping(value="/checkValidUser")			
	public ResponseEntity checkValidUser(HttpServletRequest httpServletRequest) 			
	{			
		System.out.println("/server/checkValidUser :");		
		String userId=httpServletRequest.getParameter("email");		
		String userPw=httpServletRequest.getParameter("password");		
		System.out.println("/server/checkValidUser : "+userId+" , "+userPw);		
				
		try 		
		{		
			Map<?,?> userInfo=loginService.selectInfo(userId,userPw);	
			if(userInfo==null) 	
			{	
				System.out.println("invalid user");
				
				
			}	
			else 	
			{	
				System.out.println("user info : "+userInfo);
				
			}	
				
		} catch(Exception e) 		
		{		
				
		};		
		ResponseEntity<Map> responseEntity = new ResponseEntity(HttpStatus.OK);		
		return responseEntity;		
	}			
	
				
}				
