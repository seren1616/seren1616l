package com.example.demo.board.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BoardMapper {

	
	List<Map<?, ?>> selectAllBoard();
}
