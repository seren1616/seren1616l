<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="EUC-KR">
<script type="text/javascript" src="http://code.jquery.com/jquery-1.4.4.min.js"></script>
<title>file demo page</title>
</head>
<body>

<div id="fileUploadContainer">
<h1>1. File Upload</h1>
<form id="fileUploadForm" action="#" method="post">
<input type="file" name="file_elements" id="fileUpload" multiple>
<div id="uploadList">
<p> the lists what you select to upload : </p>
</div>
<br>
<button type="submit">upload!</button>
</form>
</div>

<div></div>

<div id="fileDownloadContainer">
<h1>2. Download File</h1>

<!--  <a href="/image/loginIcon.png" download>이미지 다운로드</a> -->
<button onClick="downloadFile()">download</button>
</div>


<script type="text/javascript">
$(document).ready(function(){console.log("get ready for filedemo jsp");});


var fileState=document.getElementById("fileUpload");
fileState.addEventListener('change', function(){
console.log("get ready for files");
var fileList=this.files;
let uploadList=document.getElementById("#uploadList");
for(var i=0;i<fileList.length;i++) 
{
	console.log(fileList[i].name);
	var fileName="<br><b>"+ (i+1) +"."+fileList[i].name+"</b>";
	$("p").append(fileName);
}
});

downloadFile=()=>{console.log("d");
var imgSrc="/image/loginIcon.png";
  if (!imgSrc) {
        alert("No Notion Page");
  return false;
  } else {
      return fetch(imgSrc, {
        method: 'GET'
      }).then(function(resp) {
          if (!resp|| !resp.ok) {
            alert("Error");
            return false;
          }
        return resp.blob();
      }).then(function(blob) {
	if(blob) download(blob);
      });
  }

}

</script>
</body>
</html>