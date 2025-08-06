import React from "react";
import "./SecuritySetting.css";

export default function ProfileSetting() {
  return (
    <div className="Securitysettings-container">
      <div className="Securitysettings-section">
        <label className="Securitysettings-label" htmlFor="email">
          메일 확인
        </label>
        <input
          id="email"
          type="email"
          defaultValue="asdf12345@naver.com"
          className="Securitysettings-input"
        />
        <div className="Securitysettings-button-group">
          <button className="Securitysettings-btn">메일 전송</button>
          <button className="Securitysettings-btn">메일 변경</button>
        </div>
        <p className="Securitysettings-error-text">현재 이메일 인증이 완료 되지 않았습니다.</p>
      </div>

      <div className="Securitysettings-section">
        <label className="Securitysettings-label" htmlFor="phone">
          전화번호 확인
        </label>
        <input
          id="phone"
          type="text"
          defaultValue="010-1234-5678"
          className="Securitysettings-input"
        />
        <div className="Securitysettings-button-group">
          <button className="Securitysettings-btn">메시지 전송</button>
          <button className="Securitysettings-btn">전화번호 변경</button>
        </div>
        <p className="Securitysettings-error-text">현재 전화번호 인증이 완료 되지 않았습니다.</p>
      </div>

      <div className="Securitysettings-section">
        <label className="Securitysettings-label" htmlFor="old-password">
          비밀번호 변경
        </label>
        <input
          id="old-password"
          type="password"
          placeholder="기존 비밀번호 입력"
          className="Securitysettings-input"
        />
        <input
          id="new-password"
          type="password"
          placeholder="새 비밀번호 입력"
          className="Securitysettings-input"
        />
        <p className="Securitysettings-password-info">변경할 비밀번호를 다시 한번 입력해 주세요.</p>
      </div>

      <div className="Securitysettings-login-record">
        <label className="Securitysettings-label">최근 로그인 기록</label>
        <table>
          <tbody>
            <tr>
              <td>2025 - 07 - 29</td>
              <td>16 : 49</td>
              <td>Chrome(Windows)</td>
            </tr>
            <tr>
              <td>2025 - 07 - 28</td>
              <td>12 : 09</td>
              <td>삼성 갤럭시 북 플렉스 (H789-1)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
