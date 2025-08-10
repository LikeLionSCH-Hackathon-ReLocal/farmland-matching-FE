import { useState } from "react";
import Step1_Location from "./Step1_Location";
import Step2_Crop from "./Step2_Crop";
import Step3_LandDetail from "./Step3_LandDetail";
import Step4_Facility from "./Step4_Facility";
import Step5_Access from "./Step5_Access";
import Step6_Review from "./Step6_Review";
import Step7_TradeDocs from "./Step7_TradeDocs";
import FloatingEmojis from "../../../pages/Effect/FloatingEmojis";
import "./SeniorFlow.css";
import { useNavigate } from "react-router-dom";

function SeniorFlow({ onSubmit }) {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    address: "",
    roadAddress: "",
    landNumber: "",
    lat: "",
    lng: "",

    crop: "",
    areaSquare: "",
    areaHectare: "",

    soilType: "",
    waterSource: "",
    owner: "",
    ownerAge: "",
    home: "",
    // registerDate: 제거

    hasWater: "",
    hasElectricity: "",
    machineAccess: "",
    // 기존 facilities 배열은 더 이상 필요 없음(유지해도 무방)
    facilities: [],

    // ✅ 새 드롭다운 3개
    hasWarehouse: "",
    hasGreenhouse: "",
    hasFence: "",

    nearRoad: "",
    pavedRoad: "",
    publicTransit: "",
    carAccess: "",

    tradeType: "",
    preferMatch: "",
    wishPrice: "",
    wishWhen: "",
    photos: [],
    reason: "",
    docDeung: null,
    docToji: null,
    docNong: null,
    comment: "",
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

  const next = () => setStep((s) => Math.min(7, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  const handleSubmit = () => {
    if (onSubmit) onSubmit(formData);
    alert("등록이 완료되었습니다!");
    navigate("/SeniorMain");
  };

  return (
    <div className="FarmlandRegistration-Wrapper">
      <FloatingEmojis />
      <button
        className="SeniorProfile-BackButton"
        onClick={() => navigate("/SeniorMain")}
      >
        ⬅ 홈으로
      </button>
      <main className="FarmlandRegistration-FlowContainer">
        {/* ✅ 총 스텝 7로 수정 */}
        <div className="FarmlandRegistration-Progress">Step {step} / 7</div>

        {step === 1 && (
          <Step1_Location
            data={formData}
            updateData={updateData}
            onNext={next}
          />
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
            updateArray={updateArray} // 사용 안 해도 무방
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
          <Step6_Review
            data={formData}
            onNext={() => setStep(7)}
            onBack={back}
          />
        )}
        {step === 7 && (
          <Step7_TradeDocs
            data={formData}
            updateData={updateData}
            onBack={() => setStep(6)}
            onSubmit={handleSubmit}
          />
        )}
      </main>

      <aside className="FarmlandRegistration-Summary">
        <div className="FarmlandRegistration-inputSumTitle">입력 정보 요약</div>

        <div className="FarmlandRegistration-SummaryGrid">
          <div>📍 행정주소: {formData.address || "미입력"}</div>
          <div>🚏 도로명 주소: {formData.roadAddress || "미입력"}</div>
          <div>🏷️ 지번: {formData.landNumber || "미입력"}</div>
          <div>
            📍 위도/경도: {formData.lat || "?"}, {formData.lng || "?"}
          </div>

          <div className="divider"></div>

          <div>🌾 작물: {formData.crop || "미입력"}</div>
          <div>
            📐 면적: {formData.areaSquare || "?"}㎡ /{" "}
            {formData.areaHectare || "?"}ha
          </div>

          <div className="divider"></div>

          <div>🧱 토양: {formData.soilType || "미입력"}</div>
          <div>💧 용수: {formData.waterSource || "미입력"}</div>
          <div>
            👤 소유자: {formData.owner || "미입력"} ({formData.ownerAge || "?"}
            세)
          </div>
          <div>🏠 거주지: {formData.home || "미입력"}</div>

          <div className="divider"></div>

          <div>🚿 농업용수: {formData.hasWater || "미입력"}</div>
          <div>⚡ 전기: {formData.hasElectricity || "미입력"}</div>
          <div>🚜 농기계 접근: {formData.machineAccess || "미입력"}</div>
          <div>🏚️ 창고: {formData.hasWarehouse || "미입력"}</div>
          <div>🌿 비닐하우스: {formData.hasGreenhouse || "미입력"}</div>
          <div>🚧 울타리: {formData.hasFence || "미입력"}</div>

          <div className="divider"></div>

          <div>🛣️ 도로 인접: {formData.nearRoad || "미입력"}</div>
          <div>🧱 포장도로: {formData.pavedRoad || "미입력"}</div>
          <div>🚌 대중교통: {formData.publicTransit || "미입력"}</div>
          <div>🚗 차량 진입: {formData.carAccess || "미입력"}</div>

          <div className="divider"></div>

          <div>📄 거래 형태: {formData.tradeType || "미입력"}</div>
          <div>🔍 우선 매칭: {formData.preferMatch || "미입력"}</div>
          <div>💰 희망 금액: {formData.wishPrice || "미입력"}</div>
          <div>📅 매도 희망 시기: {formData.wishWhen || "미입력"}</div>
          <div>📝 등록 사유: {formData.reason || "미입력"}</div>
          <div>💬 어르신 한마디: {formData.comment || "미입력"}</div>
        </div>
      </aside>
    </div>
  );
}

export default SeniorFlow;
