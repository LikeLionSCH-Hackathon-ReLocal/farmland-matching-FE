import { useState } from "react";
import "./Header.css";
import SettingsModal from "../Setting/SettingModal.jsx";

function Header() {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <div className="HeaderContainer">
        <div className="left-section">
          <img
            src="/logo.png"
            alt="Logo"
            className="HeaderLogo"
            onClick={() => window.location.reload()}
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
