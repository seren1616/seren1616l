package com.example.demo.board.controller;
			

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
@RequestMapping("/server")				
public class BoardController {				
				
				
	@Autowired			
	private LoginService loginService;
	private BoardService boardService;
	private ApiService apiService;

	@RequestMapping(value="/board/insert")
	public void insertBoard(HttpServletRequest httpServletRequest) throws Exception 
	{
//		JSONParser jsonParser;
//		JSONObject jsonObject = (JSONObject) jsonParser.
		System.out.println("/server/board/insert : "+httpServletRequest.getParameter("userId"));
		//ResponseEntity<Map> responseEntity = new ResponseEntity(HttpStatus.OK);		
		String id=httpServletRequest.getParameter("userId");
			//Map<?,?> map=new HashMap<>();
//			map.put("userId", httpServletRequest.getParameter("userId"));
//			map.put("title",httpServletRequest.getParameter("title"));
//			map.put("contents",httpServletRequest.getParameter("contents"));
//			map.put("category",1);
//			if(httpServletRequest.getParameter("isSecret")=="true") map.put("password", httpServletRequest.getParameter("password"));
			//System.out.println("title : "+map.get("title"));
			System.out.println("insert tried1"+id);
//			boardService.testFunction(id);
//			System.out.println("insert tried2");
		
			//ResponseEntity<Map> responseEntityF = new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
			//return responseEntityF;	
		
			
		//return responseEntity;		
	}
				
}				
