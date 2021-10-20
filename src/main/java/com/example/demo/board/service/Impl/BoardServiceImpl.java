package com.example.demo.board.service.Impl;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.board.mapper.BoardMapper;
import com.example.demo.board.service.BoardService;

@Service
public class BoardServiceImpl implements BoardService {

	@Autowired
	private BoardMapper boardMapper;

	
	public void testFunction(String str) 
	{
		System.out.println("¾Æ ¿Ö ¾ÈµÅ!!!");
	}
}
