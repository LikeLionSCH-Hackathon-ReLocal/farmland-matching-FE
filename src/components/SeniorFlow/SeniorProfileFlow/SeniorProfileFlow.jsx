import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import FloatingEmojis from "../../../pages/Effect/FloatingEmojis";
import Step1_Name from "./Step1_Name";
import Step2_BirthYear from "./Step2_BirthYear";
import Step3_Phone from "./Step3_Phone";
import Step4_Address from "./Step4_Address";
import Step5_LandCount from "./Step5_LandCount";
import Step6_Summary from "./Step6_Summary";
import seedSenior from "../../../api/SeniorUser"; // 현재 파일 위치에 맞춤
import "./SeniorProfileFlow.css";

const TOTAL_STEPS = 6;
const STORAGE_KEY = "senior_profile";

function SeniorProfileFlow() {
  // step 0: 요약 보기
  const [step, setStep] = useState(0);

  const navigate = useNavigate();

  const emptyProfile = useMemo(
    () => ({ name: "", birthYear: "", phone: "", address: "", landCount: "" }),
    []
  );

  const loadInitial = () => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) return JSON.parse(cached);
      if (seedSenior) {
        return {
          name: seedSenior.name ?? "",
          birthYear: seedSenior.birthYear ?? "",
          phone: seedSenior.phone ?? "",
          address: seedSenior.address ?? "",
          landCount: seedSenior.landCount ?? "",
        };
      }
      return emptyProfile;
    } catch {
      return emptyProfile;
    }
  };

  const [profile, setProfile] = useState(loadInitial);

  useEffect(() => {
    // 마운트 시 1회만 동기화(캐시가 있으면 그대로, 없으면 시드로 세팅)
    if (!localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    }
  }, []); // eslint-disable-line

  const updateProfile = (key, value) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  const saveProfile = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    alert("저장되었습니다.");
    setStep(0); // 요약으로 복귀
  };

  const resetToSeed = () => {
    const next = {
      name: seedSenior.name ?? "",
      birthYear: seedSenior.birthYear ?? "",
      phone: seedSenior.phone ?? "",
      address: seedSenior.address ?? "",
      landCount: seedSenior.landCount ?? "",
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setProfile(next);
    setStep(0);
  };

  const progressPercent = step === 0 ? 0 : Math.round((step / TOTAL_STEPS) * 100);

  return (
    <div className="SeniorProfile-Wrapper">
      <FloatingEmojis />

      {/* 좌측 상단 라우팅/도구 버튼 */}
      <div className="SeniorProfile-TopButtons">
        <button
          className="SeniorProfile-BackButton"
          onClick={() => navigate("/SeniorMain")}
          type="button"
        >
          ⬅ 홈으로
        </button>
      </div>

      {/* 입력 플로우 */}
      <main className="SeniorProfile-FlowContainer">
        <div className="SeniorProfile-ProgressBar">
          <div
            className="SeniorProfile-ProgressFill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="SeniorProfile-StepText">
          {step === 0
            ? "개인 정보"
            : `${step}단계 / 총 ${TOTAL_STEPS}단계 (${progressPercent}%)`}
        </div>

        {/* step 0: 요약 */}
        {step === 0 && (
          <div className="SeniorProfile-Step">
            <h2>어르신 프로필</h2>
            <div className="SeniorProfile-ViewCard">
              <p>👤 이름: {profile.name || "미입력"}</p>
              <p>🎂 출생년도: {profile.birthYear || "미입력"}</p>
              <p>📞 연락처: {profile.phone || "미입력"}</p>
              <p>🏠 주소: {profile.address || "미입력"}</p>
              <p>🌾 보유 농지 수: {profile.landCount || "미입력"}</p>
            </div>
            <div className="SeniorProfile-Buttons">
              <button className="SeniorProfile-Next" onClick={() => setStep(1)}>
                ✏️ 수정하기
              </button>
            </div>
          </div>
        )}

        {step === 1 && (
          <Step1_Name
            profile={profile}
            updateProfile={updateProfile}
            onNext={() => setStep(2)}
          />
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
          <Step6_Summary
            profile={profile}
            onBack={() => setStep(5)}
            onSave={saveProfile}
          />
        )}
      </main>

      {/* 항상 보이는 요약 사이드 */}
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
    </div>
  );
}

export default SeniorProfileFlow;
