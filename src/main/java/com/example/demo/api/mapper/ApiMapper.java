package com.example.demo.api.mapper;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ApiMapper {

	void insertAdinfo(Map<?,?> info); 
	void insertStoreInfoMst(Map<?,?> info);
	int countExistId(String userId);
}
