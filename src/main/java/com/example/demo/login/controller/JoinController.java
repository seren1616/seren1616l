package com.example.demo.login.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController

public class JoinController {

	@RequestMapping(value="/join")	
	public ModelAndView joinPage() 
	{
		ModelAndView mv=new ModelAndView();
		System.out.println("ddd");
		mv.setViewName("join");
		mv.addObject("validYN", "N");
		return mv;
	}

	
}
