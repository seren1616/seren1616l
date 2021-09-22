<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%> 
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%> 
<!DOCTYPE html> 
<html lang="ko"> 
<head> 
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> 
<title>Login page</title> 
<link rel="stylesheet" type="text/css" href="/css/style.css" >
<script type="text/javascript" src="http://code.jquery.com/jquery-1.4.4.min.js"></script>
</head> 
<body> 

<h2 style="text-align:center">Login</h2> 

 
	 <form action="/logincheck" method="post">
		 <div class="imgContainer">
		 	<img alt="login icon image" src="/image/loginIcon.png" class="avatar">
		 </div>
		 <div class="containter">
		 <label for="userId"><b>ID</b></label>
		 <input type="text" placeholder="input your id" name="userId" required>
		 <label for="userPw"><b>PASSWORD</b></label>
		 <input type="password" placeholder="input your password" name="userPw" required>
		 
		 <button type="submit">Login</button>
		 <label>
		 	<input type="checkbox" checked="checked" name="remember"> remember me
		 </label>
		 </div>
		 
		 <div class="container" style="background-color:#f1f1f1">
		    <!-- <button type="button" class="cancelbtn">Cancel</button>
		     -->
		     <span class="join">
		     아직 회원이 아닌가요? <a href="/join">회원가입</a>
		     <br>
		     Forgot <a href="#">password?</a>
		     </span>
		 </div>
	 </form>

<script type="text/javascript">

$(document).ready(function(){console.log("ready for login page");});

</script>

</body> 
</html>
