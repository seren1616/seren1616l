import React, { useEffect } from "react";
import PopupCss from "./Popup.css";
import $ from "jquery";
window.$ = window.jQuery = $;

function Popup(props) {
  // selectionInit = searchType => {
  //   var opt = $();
  //   var $el = $(searchType).attr("id");
  //   $el.append(opt);
  // };

  // ReactDOM.render(console.log("ready"));

  // useEffect(() => {
  //   selectionInit("#searchType");
  // }, []);

  return (
    <div class="dim-layer">
      <div class="dimBg"></div>
      <div id="layer" class="popup-layer">
        <div class="pop-contents">
          <select id="searchType"></select>
          <input type="text" placeholder="검색어를 입력하세요" />
          <button id="btn-search">search</button>
        </div>
        <div>
          <a href="#">Close</a>
        </div>
      </div>
    </div>
  );
}

export default Popup;
