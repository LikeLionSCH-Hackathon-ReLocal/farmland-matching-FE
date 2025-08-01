import React from "react";
import "./ProfileSetting.css";

function ProfileSettings() {
  return (
    <div className="container">
      {/* 왼쪽 영역 */}
      <div className="left-section">
        <div className="profile-img">
          <div className="gray-circle"></div>
        </div>

        <div className="input-row">
          <label>성</label>
          <input type="text" placeholder="김" />
        </div>
        <div className="input-row">
          <label>이름</label>
          <input type="text" placeholder="철수" />
        </div>
        <div className="input-row">
          <label>성별</label>
          <input type="text" placeholder="남성" />
        </div>
        <div className="input-row">
          <label>전화번호</label>
          <input type="text" placeholder="010-1234-5678" className="num" />
          <span className="error-text">현재 전화번호 인증이 완료되지 않았습니다.</span>  
        </div>
        <div className="input-row">
          <label>메일</label>
          <input type="text" placeholder="asdf12345@naver.com" className="num" />
          <span className="error-text">현재 이메일 인증이 완료되지 않았습니다.</span>
        </div>
       
      </div>

      {/* 오른쪽 영역 */}
      <div className="right-section">
        <div className="input-row">
          <label>주소</label>
          <input type="text" placeholder="충청남도 아산시 어쩌고 저쩌고" />
        </div>
        <div className="input-row">
          <label>자격증</label>
          <select>
            <option>농기계운전기능사</option>
            <option>귀농귀촌인증서</option>
            <option>농업기술사</option>
            <option>등등</option>
          </select>
        </div>
        <div className="input-row">
          <label>농업 경력</label>
          <select>
            <option>1년 이하</option>
            <option>1~3년</option>
            <option>3~5년</option>
            <option>5년 이상</option>
          </select>
        </div>
        <div className="input-row">
          <label>관심 작물/농업 분야</label>
          <select>
            <option>벼</option>
            <option>과수</option>
            <option>시설채소</option>
            <option>축산</option>
          </select>
        </div>
        <div className="input-row">
          <label>추천인 정보</label>
          <select>
            <option>지자체</option>
            <option>지인</option>
            <option>없음</option>
          </select>
        </div>
        <div className="input-row">
          <label>기술 장비 특기</label>
          <input type="text" placeholder="드론, 트랙터 등" />
        </div>
        <div className="input-row">
          <label>희망 거래</label>
          <input type="text" placeholder="토지 매입, 임대 등" />
        </div>

        <button className="submit-button">등록</button>
      </div>
    </div>
  );
}

export default ProfileSettings;
