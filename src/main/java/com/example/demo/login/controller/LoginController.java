package com.example.demo.login.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.example.demo.login.service.LoginService;
import com.example.demo.login.vo.LoginVo;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class LoginController {

	@Autowired
	private LoginService loginService;
	private ModelAndView mv;
	String returnValue="";
	
	
	@RequestMapping(value = "/login")
	public ModelAndView login() throws Exception 
	{
		System.out.print("?");
		mv= new ModelAndView("login");
		List<?> list=new ArrayList<>();
		list=loginService.selectAllInfo();
		mv.addObject("list", list);
		return mv;

	}
	
	@GetMapping(value="/logincheck") //@RequestMapping(value="/logincheck", method=RequestMethod.GET)
	public ModelAndView backToLogin() throws Exception
	{
		this.mv.setViewName("/login");
		return mv;
	}
	
	@PostMapping(value="/logincheck")  //@RequestMapping(value="/logincheck", method=RequestMethod.POST)	
	public ModelAndView loginCheck(@RequestParam("userId") String userId, @RequestParam("userPw") String userPw,HttpServletRequest httpServletRequest,LoginVo vo,Model model,@RequestBody String val,
			@RequestParam Map<?,?> map) throws Exception
	
	{
		
		System.out.println("### login check1 ### : "+userId+", "+userPw);
		
		String userId2 = httpServletRequest.getParameter("userId");
		String userPw2=httpServletRequest.getParameter("userPw");
		System.out.println("### login check2 ### : "+userId2+", "+userPw2);

		System.out.println("### login check3 ### : "+vo.getUserId()+","+vo.getUserPw());
		
		System.out.println("####Request Body#### : "+val);
		
		System.out.println("####Map#### : " +map.get("userId"));
		
		try 
		{
			Map<?,?> userInfo=loginService.selectInfo(userId,userPw);
			if(userInfo==null) 
			{
				System.out.println("invalid user");
				mv.setViewName("login");
			
			}
			else 
			{
				System.out.println("user info : "+userInfo);
				
				mv.setViewName("index");
				mv.addObject("userId",userInfo.get("userId"));
				model.addAttribute("userId", userInfo.get("userId"));
			}
	
		} catch(Exception e) 
		{
			
		};
		
		return mv;
	}

}
