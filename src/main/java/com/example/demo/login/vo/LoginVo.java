package com.example.demo.login.vo;

import lombok.Data;

@Data
public class LoginVo {
private String userId;
private String userSeq;
private String userPw;
public String getUserId() {
	return userId;
}
public void setUserId(String userId) {
	this.userId = userId;
}
public String getUserSeq() {
	return userSeq;
}
public void setUserSeq(String userSeq) {
	this.userSeq = userSeq;
}
public String getUserPw() {
	return userPw;
}
public void setUserPw(String userPw) {
	this.userPw = userPw;
}
}
