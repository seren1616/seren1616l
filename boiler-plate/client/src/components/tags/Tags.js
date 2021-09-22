//rsf
import React from "react";
import PopupComponent from "./Popup";

function Tags(props) {
  return (
    <div>
      <div id="media-tag">
        <h1>미디어 관련 태그</h1>
        <p>이미지</p>
        <img src="../../resource/img/loginIcon.png" />
        <p>video</p>
        <video src="https://www.youtube.com/watch?v=uA6wARPeK_c" controls />
      </div>
      <div id="link-tag">
        <h1>링크 관련 태그</h1>
        <a href="www.google.com">구글로 바로 이동</a>
        <br></br>
        <a href="www.google.com" target="_blank">
          새 창을 띄워서 구글로 이동
        </a>
      </div>
      <div id="input-tag">
        <h1>인풋 관련 태그</h1>
        텍스트 <input type="text" />
        <br />
        체크박스 <input type="checkbox" />
        <br />
        라디오버튼 <input type="radio" />
        <br />
        색깔 <input type="color" />
        <br />
        여러문장 <textarea />
        <br />
        드롭다운
        <select>
          <option value="id">id</option>
          <option value="이름">이름</option>
        </select>
        <br />
        로그인 폼
        <br />
        <form>
          <input type="email" placeholder="email을 입력하세요" />
          <input type="password" placeholder="비밀번호를 입력하세요" />
          <button type="submit">LOGIN</button>
        </form>
      </div>

      <h1>dim 처리 검색 팝업</h1>
      <div>
        <button id="popup">검색하기(팝업)</button>
        <PopupComponent />
      </div>
    </div>
  );
}

export default Tags;
