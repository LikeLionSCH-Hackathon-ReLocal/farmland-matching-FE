import React, { useState, useEffect } from "react";
import "./SettingModal.css";
import Sidebar from "./Sidebar";
import ProfileSettings from "./SettingContent/ProfileSettings";
import SecuritySettings from "./SettingContent/SecuritySettings";
import AlertSettings from "./SettingContent/AlertSettings";
import TrustProfileForm from "./SettingContent/TrustProfileForm";

const sections = {
  "계정": ["내 프로필", "로그인 및 보안", "알림 설정"],
  "농지 및 매칭": ["농지 관리", "신청한 매칭 내역", "관심 농지 목록"],
  "신뢰 관리": [
    "신뢰 프로필 관리",
    "자기소개 영상/음성 업로드",
    "추천인/보증인 등록",
    "나의 신뢰 레벨 확인",
  ],
};

function SettingsModal({ onClose }) {
  const [selectedMenu, setSelectedMenu] = useState("내 프로필");  /* 기본 선택 메뉴 */

  // ESC 키 누르면 모달 닫기
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const currentSection = Object.entries(sections).find(([_, items]) =>
    items.includes(selectedMenu)
  )?.[0];

  const renderContent = () => {
    switch (selectedMenu) {
      case "내 프로필":
        return <ProfileSettings />;
      case "로그인 및 보안":
        return <SecuritySettings />;
      case "알림 설정":
        return <AlertSettings />;
      case "농지 관리":
        return <div>농지 관리 설정 내용</div>;
      case "신청한 매칭 내역":
        return <div>신청한 매칭 내역 내용</div>;
      case "관심 농지 목록":
        return <div>관심 농지 목록 내용</div>;
      case "신뢰 프로필 관리":
        return <TrustProfileForm />;
      case "자기소개 영상/음성 업로드":
        return <div>자기소개 영상/음성 업로드 내용</div>;
      case "추천인/보증인 등록":
        return <div>추천인/보증인 등록 내용</div>;
      case "나의 신뢰 레벨 확인":
        return <div>나의 신뢰 레벨 확인 내용</div>;
      default:
        return <div style={{ padding: "1rem" }}>설정 항목을 선택하세요.</div>;
    }
  };

  return (
    <div className="ModalOverlay">
      <div className="SettingsContainer">
        <Sidebar selected={selectedMenu} onMenuSelect={setSelectedMenu} />

        <div className="MainSettingsArea">
          <div className="SettingsSectionTitle">{currentSection}</div>

          <div className="SettingsTabs">
            {sections[currentSection]?.map((item) => (
              <button
                key={item}
                className={`TabButton ${selectedMenu === item ? "active" : ""}`}
                onClick={() => setSelectedMenu(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="SettingsDetailArea">{renderContent()}</div>
        </div>

        <button className="CloseButton" onClick={onClose}>
          ✕ ESC
        </button>
      </div>
    </div>
  );
}

export default SettingsModal;
