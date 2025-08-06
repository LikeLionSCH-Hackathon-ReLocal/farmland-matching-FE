import { useState } from "react";
import Step1_Location from "./Step1_Location";
import Step2_Crop from "./Step2_Crop";
import Step3_LandDetail from "./Step3_LandDetail";
import Step4_Facility from "./Step4_Facility";
import Step5_Access from "./Step5_Access";
import Step6_Review from "./Step6_Review";
import Step7_TradeDocs from "./Step7_TradeDocs";
import FloatingEmojis from "../../../pages/Effect/FloatingEmojis";
function SeniorFlow({ onSubmit }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1
    address: "", // 행정주소
    roadAddress: "", // 도로명 주소
    landNumber: "", // 지번
    lat: "", // 위도 (선택)
    lng: "", // 경도 (선택)

    // Step 2
    crop: "", // 최근 재배 작물
    areaSquare: "", // 면적(㎡)
    areaHectare: "", // 면적(ha) - 자동 환산 or 입력

    // Step 3
    soilType: "", // 토양 형태
    waterSource: "", // 용수 접근성
    owner: "", // 소유자
    ownerAge: "", // 소유자 연령 (선택)
    home: "", // 거주지
    registerDate: "", // 등록일

    // Step 4
    hasWater: "", // 전용 농업용수 여부
    hasElectricity: "", // 전기 유무
    machineAccess: "", // 농기계 접근 가능 여부
    facilities: [], // 창고/비닐하우스/울타리 등

    // Step 5
    nearRoad: "", // 도로 인접 여부
    pavedRoad: "", // 포장도로 여부
    publicTransit: "", // 대중교통 접근성
    carAccess: "", // 차량 진입 가능 여부

    // Step 6
    tradeType: "", // 거래 형태(매매/임대 등)
    preferMatch: "", // 우선 매칭 대상
    wishPrice: "", // 희망 금액
    wishWhen: "", // 매도 희망 시기
    photos: [], // 사진(최대 5장)
    reason: "", // 등록 사유
    docDeung: null, // 등기부등본
    docToji: null, // 토지대장
    docNong: null, // 농지원부/경영체 등록증
    comment: "", // 어르신 한마디
  });

  const updateData = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const updateArray = (key, value, checked) => {
    setFormData((prev) => {
      const arr = new Set(prev[key] || []);
      if (checked) arr.add(value);
      else arr.delete(value);
      return { ...prev, [key]: Array.from(arr) };
    });
  };

  const next = () => setStep((s) => Math.min(6, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  const handleSubmit = () => {
    if (onSubmit) onSubmit(formData);
    alert("등록이 완료되었습니다!");
  };

  return (
    <div className="LandRegisterFlow">
      <FloatingEmojis />
      <div className="Progress">Step {step} / 6</div>

      {step === 1 && (
        <Step1_Location data={formData} updateData={updateData} onNext={next} />
      )}
      {step === 2 && (
        <Step2_Crop
          data={formData}
          updateData={updateData}
          onNext={next}
          onBack={back}
        />
      )}
      {step === 3 && (
        <Step3_LandDetail
          data={formData}
          updateData={updateData}
          onNext={next}
          onBack={back}
        />
      )}
      {step === 4 && (
        <Step4_Facility
          data={formData}
          updateData={updateData}
          updateArray={updateArray}
          onNext={next}
          onBack={back}
        />
      )}
      {step === 5 && (
        <Step5_Access
          data={formData}
          updateData={updateData}
          onNext={next}
          onBack={back}
        />
      )}
      {step === 6 && (
        <Step6_Review data={formData} onNext={() => setStep(7)} onBack={back} />
      )}
      {step === 7 && (
        <Step7_TradeDocs
          data={formData}
          updateData={updateData}
          onBack={() => setStep(6)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

export default SeniorFlow;
