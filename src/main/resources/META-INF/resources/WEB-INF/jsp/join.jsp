<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" type="text/css" href="/css/style.css" >
<script type="text/javascript" src="http://code.jquery.com/jquery-1.4.4.min.js"></script>
<meta charset="EUC-KR">
<title>ȸ������</title>
</head>
<body>
<div class="joinContainer">
	
	<div class="formContaiter">	
		<form method="post"  onSubmit="return false;">
		
		<span>
		<label for="userId">
		����� id : <br><input id="userId" name="userId" placeholder="����� id�� �Է��ϼ���" required>
		<button id="validChk" onclick="validChkFunc();" style="width:20%" >�ߺ�Ȯ��</button>
		</span>
		<br>
		<span id="validYN"></span>
		</label>
		

		</form>

	</div>

</div>
<script type="text/javascript">
$(document).ready(function(){console.log("ready for join");
$("#validYN").text("�ߺ�Ȯ���� �����ּ���.");
});

validChkFunc=()=>
	{
	
		var userId=$("#userId").val()!=''?$("#userId").val():alert("����� id�� �Է����ּ���");
	if(userId)
	{
		console.log("valid check id"+userId);	
		var obj=new Object();
		obj.userId=userId;
		var jsonData=JSON.stringify(obj);
		ajaxCall(obj,"post","json","/api/user/validChk");
		
	}
	
	}

ajaxCall=(dt,callType,dtType,callUrl)=>
{
console.log("ajax called"+dt);
$.ajax({
	type:callType,
	dataType:dtType,
	url:callUrl,
	data:dt,
	success:function(data)
	{
		if(!data.cnt) $("#validYN").text("��밡���� id�Դϴ�");
	},
	error:function(e)
	{
		console.log("server error");
	}

});
}

</script>
</body>
</html>