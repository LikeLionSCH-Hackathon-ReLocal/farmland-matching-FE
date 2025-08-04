import { useState } from "react";
import Step1_Name from "./Step1_Name";
import Step2_BirthYear from "./Step2_BirthYear";
import Step3_Phone from "./Step3_Phone";
import Step4_Address from "./Step4_Address";
import Step5_LandCount from "./Step5_LandCount";
import Step6_Summary from "./Step6_Summary";
import "./SeniorProfileFlow.css";
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
    // 저장 후 이동하고 싶다면:
    // window.location.href = "/senior/profile";  // 원하는 경로로 변경
  };
  // 초기 로드 시 로컬스토리지에서 프로필 불러오기
  return (
    <div className="SeniorProfile-FlowContainer">
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
    </div>
  );
}

export default SeniorProfileFlow;
