package com.example.demo.filedemo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FileDemoController {

	@GetMapping(value="/fileDemo")
	public String fileDemoPage() 
	{
		return "fileDemo";
	}
}
