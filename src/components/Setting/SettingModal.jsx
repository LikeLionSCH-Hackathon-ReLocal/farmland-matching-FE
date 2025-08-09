import React, { useState, useEffect } from "react";
import "./SettingModal.css";
import Sidebar from "./Sidebar";
import ProfileSettings from "./SettingContent/AccountSetting/ProfileSettings";
import SecuritySettings from "./SettingContent/AccountSetting/SecuritySettings";
import AlertSettings from "./SettingContent/AccountSetting/AlertSettings";
import Star from "./SettingContent/FarmlandMatchingSetting/Star";
import Sell from "./SettingContent/FarmlandMatchingSetting/Sell";
import Certification from "./SettingContent/TrustSetting/Certification";
import IntroductionForm from "./SettingContent/TrustSetting/IntroductionForm";
import RecommenderForm from "./SettingContent/TrustSetting/RecommenderForm";
import TrustScore from "./SettingContent/TrustSetting/TrustScore";
import { getYoungUserData } from "../../api/YoungUser"; // 경로 확인

function SettingsModal({ onClose }) {
  const [selectedMenu, setSelectedMenu] = useState("내 프로필");

  // ✅ YoungUser 상위 보관
  const [youngUser, setYoungUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  // 기존 formData 그대로 유지
  const [formData, setFormData] = useState({
    certificates: [],
    certificateFile: null,
    crops: [],
    tools: [],
    customTools: "",
    trades: [],
    comment: "",
  });

  useEffect(() => {
    (async () => {
      const list = await getYoungUserData();
      setYoungUser(list?.[0] || null);
      setUserLoading(false);
    })();
  }, []);

  const updateData = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const updateArray = (key, value, checked) => {
    const prev = new Set(formData[key] || []);
    if (checked) prev.add(value);
    else prev.delete(value);
    setFormData((prev) => ({ ...prev, [key]: Array.from(prev) }));
  };

  const handleSubmit = () => {
    console.log("제출된 데이터", formData);
    alert("제출 완료");
  };

  const sections = {
    계정: ["내 프로필", "로그인 및 보안", "알림 설정"],
    "농지 및 매칭": ["신청한 매칭 내역", "관심 농지 목록"],
    "신뢰 관리": [
      "신뢰 프로필 관리",
      "자기소개 영상/음성 업로드",
      "추천인/보증인 등록",
      "나의 신뢰 레벨 확인",
    ],
  };

  const currentSection = Object.entries(sections).find(([_, items]) =>
    items.includes(selectedMenu)
  )?.[0];

  const renderContent = () => {
    if (userLoading)
      return <div style={{ padding: "1rem" }}>사용자 불러오는 중…</div>;

    switch (selectedMenu) {
      case "내 프로필":
        // ✅ youngUser 내려주고, 변경은 setYoungUser로 반영
        return <ProfileSettings user={youngUser} onChange={setYoungUser} />;
      case "로그인 및 보안":
        return <SecuritySettings user={youngUser} onChange={setYoungUser} />;
      case "알림 설정":
        return <AlertSettings user={youngUser} />;
      case "신청한 매칭 내역":
        return <Sell user={youngUser} />;
      case "관심 농지 목록":
        return <Star user={youngUser} />;
      case "신뢰 프로필 관리":
        return (
          <Certification
            data={formData}
            updateData={updateData}
            updateArray={updateArray}
            onSubmit={handleSubmit}
            // ✅ YoungUser 연동
            user={youngUser}
            onUserChange={setYoungUser}
          />
        );
      case "자기소개 영상/음성 업로드":
        return <IntroductionForm user={youngUser} onUserChange={setYoungUser} />;
      case "추천인/보증인 등록":
        return <RecommenderForm user={youngUser} onUserChange={setYoungUser} />;
      case "나의 신뢰 레벨 확인":
        return <TrustScore user={youngUser} />;
      default:
        return <div style={{ padding: "1rem" }}>설정 항목을 선택하세요.</div>;
    }
  };

  return (
    <div className="SettingModal-ModalOverlay">
      <div className="SettingModal-SettingsContainer">
        <Sidebar selected={selectedMenu} onMenuSelect={setSelectedMenu} />
        <div className="SettingModal-MainSettingsArea">
          <div className="SettingModal-SettingsSectionTitle">
            {currentSection}
          </div>
          <div className="SettingModal-SettingsTabs">
            {sections[currentSection]?.map((item) => (
              <button
                key={item}
                className={`SettingModal-TabButton ${
                  selectedMenu === item ? "active" : ""
                }`}
                onClick={() => setSelectedMenu(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="SettingModal-SettingsDetailArea">
            {renderContent()}
          </div>
        </div>
        <button className="SettingModal-CloseButton" onClick={onClose}>
          ✕ ESC
        </button>
      </div>
    </div>
  );
}

export default SettingsModal;
