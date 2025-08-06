import { useState, useEffect } from "react";
import FloatingEmojis from "../../../pages/Effect/FloatingEmojis";
import Step1_Name from "./Step1_Name";
import Step2_BirthYear from "./Step2_BirthYear";
import Step3_Phone from "./Step3_Phone";
import Step4_Address from "./Step4_Address";
import Step5_LandCount from "./Step5_LandCount";
import Step6_Summary from "./Step6_Summary";
import "./SeniorProfileFlow.css";

const TOTAL_STEPS = 6;

function SeniorProfileFlow() {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({
    name: "",
    birthYear: "",
    phone: "",
    address: "",
    landCount: "",
  });

  const updateProfile = (key, value) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  const saveProfile = () => {
    localStorage.setItem("senior_profile", JSON.stringify(profile));
    alert("저장되었습니다.");
  };

  // 진행률 퍼센트 계산
  const progressPercent = Math.round((step / TOTAL_STEPS) * 100);

  return (
    <div className="SeniorProfile-Wrapper">
      <FloatingEmojis />

      {/* 좌측 정보 요약 */}
      <aside className="SeniorProfile-Summary">
        <h3>입력 정보</h3>
        <ul>
          <li>👤 이름: {profile.name || "미입력"}</li>
          <li>🎂 출생년도: {profile.birthYear || "미입력"}</li>
          <li>📞 연락처: {profile.phone || "미입력"}</li>
          <li>🏠 주소: {profile.address || "미입력"}</li>
          <li>🌾 농지 수: {profile.landCount || "미입력"}</li>
        </ul>
      </aside>

      {/* 우측 단계별 입력 */}
      <main className="SeniorProfile-FlowContainer">
        {/* 진행 바 */}
        <div className="SeniorProfile-ProgressBar">
          <div className="SeniorProfile-ProgressFill" style={{ width: `${progressPercent}%` }} />
        </div>
        <div className="SeniorProfile-StepText">
          {step}단계 / 총 {TOTAL_STEPS}단계 ({progressPercent}%)
        </div>

        {/* 단계별 컴포넌트 */}
        {step === 1 && (
          <Step1_Name profile={profile} updateProfile={updateProfile} onNext={() => setStep(2)} />
        )}
        {step === 2 && (
          <Step2_BirthYear
            profile={profile}
            updateProfile={updateProfile}
            onBack={() => setStep(1)}
            onNext={() => setStep(3)}
          />
        )}
        {step === 3 && (
          <Step3_Phone
            profile={profile}
            updateProfile={updateProfile}
            onBack={() => setStep(2)}
            onNext={() => setStep(4)}
          />
        )}
        {step === 4 && (
          <Step4_Address
            profile={profile}
            updateProfile={updateProfile}
            onBack={() => setStep(3)}
            onNext={() => setStep(5)}
          />
        )}
        {step === 5 && (
          <Step5_LandCount
            profile={profile}
            updateProfile={updateProfile}
            onBack={() => setStep(4)}
            onNext={() => setStep(6)}
          />
        )}
        {step === 6 && (
          <Step6_Summary profile={profile} onBack={() => setStep(5)} onSave={saveProfile} />
        )}
      </main>
    </div>
  );
}

export default SeniorProfileFlow;
