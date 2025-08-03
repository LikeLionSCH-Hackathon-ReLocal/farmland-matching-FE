import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ⬅ 추가
import "./Header.css";
import SettingsModal from "../Setting/SettingModal.jsx";

function Header() {
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate(); // ⬅ 추가

  return (
    <>
      <div className="HeaderContainer">
        <div className="left-section">
          {/* 로고 클릭 시 IntroPage로 이동 */}
          <img
            src="/LOGO1.png"
            alt="Logo"
            className="HeaderLogo"
            onClick={() => navigate("/")} // ⬅ IntroPage 경로로 이동
          />
          <div className="TitleContainer">
            <span className="HeaderTitle">밭 볼텨유?</span>
            <span className="HeaderSubtitle">농지 매칭 플랫폼</span>
          </div>
        </div>

        <div className="right-section">
          <button
            className="SettingsButton"
            onClick={() => setShowSettings(true)}
          >
            ⚙ 설정
          </button>
        </div>
      </div>

      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </>
  );
}

export default Header;
