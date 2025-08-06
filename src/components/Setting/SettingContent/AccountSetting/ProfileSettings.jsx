import React, { useState } from "react";
import "./ProfileSetting.css";

function ProfileSettings() {
  const [selectedCertificates, setSelectedCertificates] = useState([]);
  const [customCertificate, setCustomCertificate] = useState("");

  const toggleCertificate = (cert) => {
    setSelectedCertificates((prev) =>
      prev.includes(cert)
        ? prev.filter((c) => c !== cert)
        : [...prev, cert]
    );
  };

  return (
    <div className="ProfileSettings-container">
      {/* 왼쪽 영역 */}
      <div className="ProfileSettings-left-section">
        <div className="ProfileSettings-profile-img">
          <div className="ProfileSettings-gray-circle"></div>
        </div>

        <div className="ProfileSettings-input-row">
          <label>이름</label>
          <input type="text" placeholder="김철수" />
        </div>
        <div className="ProfileSettings-input-row">
          <label>나이</label>
          <input type="text" placeholder="27" />
        </div>
        <div className="ProfileSettings-input-row">
          <label>성별</label>
          <input type="text" placeholder="남성" />
        </div>
        <div className="ProfileSettings-input-row">
          <label>전화번호</label>
          <input type="text" placeholder="010-1234-5678" className="ProfileSettings-num" />
          <span className="ProfileSettings-error-text">현재 전화번호 인증이 완료되지 않았습니다.</span>
        </div>
        <div className="ProfileSettings-input-row">
          <label>메일</label>
          <input type="text" placeholder="asdf12345@naver.com" className="ProfileSettings-num" />
          <span className="ProfileSettings-error-text">현재 이메일 인증이 완료되지 않았습니다.</span>
        <div className="ProfileSettings-input-row">
          <label>주소</label>
          <input type="text" placeholder="충청남도 아산시 어쩌고 저쩌고" />
        </div>
        </div>
      </div>

      {/* 오른쪽 영역 */}
      <div className="ProfileSettings-right-section">

        <div className="ProfileSettings-input-row">
          <label>자격증</label>
          <div className="ProfileSettings-certificate-buttons">
            {["농기계운전기능사", "귀농귀촌인증서", "농업기술사","뭐가 있겠지","뭐가 있겠지2","뭐가 있겠지3"].map((cert) => (
              <button
                key={cert}
                className={`ProfileSettings-cert-button ${selectedCertificates.includes(cert) ? "selected" : ""}`}
                onClick={() => toggleCertificate(cert)}
              >
                {cert}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="기타 자격증 입력"
            value={customCertificate}
            onChange={(e) => setCustomCertificate(e.target.value)}
            className="ProfileSettings-custom-cert-input"
          />
        </div>

        <div className="ProfileSettings-input-row">
          <label>농업 경력</label>
          <select>
            <option>1년 이하</option>
            <option>1~3년</option>
            <option>3~5년</option>
            <option>5년 이상</option>
          </select>
        </div>

        <div className="ProfileSettings-input-row">
          <label>관심 작물/농업 분야</label>
          <select>
            <option>벼</option>
            <option>과수</option>
            <option>시설채소</option>
            <option>축산</option>
          </select>
        </div>

        <div className="ProfileSettings-input-row">
          <label>추천인 정보</label>
          <select>
            <option>지자체</option>
            <option>지인</option>
            <option>없음</option>
          </select>
        </div>

        <div className="ProfileSettings-input-row">
          <label>기술 장비 특기</label>
          <input type="text" placeholder="드론, 트랙터 등" />
        </div>

        <div className="ProfileSettings-input-row">
          <label>희망 거래</label>
          <input type="text" placeholder="토지 매입, 임대 등" />
        </div>

        <button className="ProfileSettings-submit-button">등록</button>
      </div>
    </div>
  );
}

export default ProfileSettings;
