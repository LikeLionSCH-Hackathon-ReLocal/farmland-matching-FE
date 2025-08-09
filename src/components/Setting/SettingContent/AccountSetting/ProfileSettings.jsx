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

      <div className="ProfileSettings-top-section">
        <div className="ProfileSettings-left-top-section">
          <div className="ProfileSettings-input-row half-width">
            <label>이름</label>
            <input type="text" placeholder="김철수" />
          </div>
          <div className="ProfileSettings-input-row half-width">
            <label>나이</label>
            <input type="text" placeholder="27" />
          </div>
          <div className="ProfileSettings-input-row half-width">
            <label>성별</label>
            <input type="text" placeholder="남성" />
          </div>
        </div>

        <div className="ProfileSettings-profile-photo">
          <img
            src="/images/ptf.png"
            alt="프로필 사진"
            className="ProfileSettings-photo-img"
          />
        </div>
      </div>

      <div className="ProfileSettings-left-section">
        <div className="ProfileSettings-input-row">
          <label>전화번호</label>
          <input
            type="text"
            placeholder="010-1234-5678"
            className="ProfileSettings-num"
          />
          <span className="ProfileSettings-error-text">
            현재 전화번호 인증이 완료되지 않았습니다.
          </span>
        </div>
        <div className="ProfileSettings-input-row">
          <label>메일</label>
          <input
            type="text"
            placeholder="asdf12345@naver.com"
            className="ProfileSettings-num"
          />
          <span className="ProfileSettings-error-text">
            현재 이메일 인증이 완료되지 않았습니다.
          </span>
        </div>
        <div className="ProfileSettings-input-row">
          <label>주소</label>
          <input type="text" placeholder="충청남도 아산시 어쩌고 저쩌고" />
        </div>
      </div>

      <button className="ProfileSettings-submit-button">등록</button>
    </div>
  );
}

export default ProfileSettings;
