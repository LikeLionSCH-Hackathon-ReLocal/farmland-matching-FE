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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    landName: "",                 // -> landName
    address: "",              // -> landAddress
    roadAddress: "",          // -> landLoadAddress (서비스에서 이 철자 사용)
    landNumber: "",
    lat: "",
    lng: "",

    crop: "",                 // -> landCrop
    areaSquare: "",           // -> landArea (우선 areaSquare 사용, 없으면 areaHectare)
    areaHectare: "",

    soilType: "",             // -> soiltype
    waterSource: "",
    owner: "",                // -> ownerName
    ownerAge: "",
    home: "",                 // -> ownerAddress

    hasWater: "",             // -> landWater
    hasElectricity: "",       // -> landElec
    machineAccess: "",        // -> landMachine
    facilities: [],           // (서버 DTO에 없으므로 전송 안 함)

    hasWarehouse: "",         // -> landStorage
    hasGreenhouse: "",        // -> landHouse
    hasFence: "",             // -> landFence

    nearRoad: "",             // -> landRoad
    pavedRoad: "",            // -> landWellRoad
    publicTransit: "",        // -> landBus
    carAccess: "",            // -> landCar

    tradeType: "",            // -> landTrade
    preferMatch: "",          // -> landMatch
    wishPrice: "",            // -> landPrice
    wishWhen: "",             // -> landWhen

    photos: [],               // -> landImage (대표 1장만)
    reason: "",               // -> landWhy
    docDeung: null,           // -> landRegister
    docToji: null,            // -> landCadastre
    docNong: null,            // -> landCertification
    comment: "",              // -> landComent
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

  // ---------- 업로드 유틸 ----------
  const buildMultipart = (data) => {
    const fd = new FormData();

    // 프론트 상태값 -> 서버 DTO 필드명 매핑
    const keyMap = {
      landName: "landName",
      address: "landAddress",
      roadAddress: "landLoadAddress", // 서비스에서 getLandLoadAddress() 사용
      landNumber: "landNumber",
      crop: "landCrop",
      // landArea는 아래서 별도 처리 (areaSquare 우선)
      soilType: "soiltype",
      waterSource: "waterSource",
      owner: "ownerName",
      ownerAge: "ownerAge",
      home: "ownerAddress",
      hasWater: "landWater",
      hasElectricity: "landElec",
      machineAccess: "landMachine",
      hasWarehouse: "landStorage",
      hasGreenhouse: "landHouse",
      hasFence: "landFence",
      nearRoad: "landRoad",
      pavedRoad: "landWellRoad",
      publicTransit: "landBus",
      carAccess: "landCar",
      tradeType: "landTrade",
      preferMatch: "landMatch",
      wishPrice: "landPrice",
      wishWhen: "landWhen",
      reason: "landWhy",
      comment: "landComent",
      // 파일은 아래서 별도 처리
    };

    // 1) 일반 텍스트 필드 매핑/전송
    Object.entries(keyMap).forEach(([from, to]) => {
      const v = data[from];
      if (v !== undefined && v !== null && String(v).length > 0) {
        fd.append(to, String(v));
      }
    });

    // 2) landArea 선택 로직 (areaSquare 우선, 없으면 areaHectare)
    const landArea = data.areaSquare && String(data.areaSquare).trim().length > 0
      ? data.areaSquare
      : (data.areaHectare || "");
    if (String(landArea).trim().length > 0) {
      fd.append("landArea", String(landArea));
    }

    // 3) 파일 필드 매핑
    // 문서 3종
    if (data.docDeung instanceof File || data.docDeung instanceof Blob) {
      fd.append("landRegister", data.docDeung, data.docDeung.name ?? "landRegister");
    }
    if (data.docToji instanceof File || data.docToji instanceof Blob) {
      fd.append("landCadastre", data.docToji, data.docToji.name ?? "landCadastre");
    }
    if (data.docNong instanceof File || data.docNong instanceof Blob) {
      fd.append("landCertification", data.docNong, data.docNong.name ?? "landCertification");
    }

    // 대표 이미지(landImage)는 photos 중 첫 장만 사용
    if (Array.isArray(data.photos)) {
      const first = data.photos.find(
        (f) => f instanceof File || f instanceof Blob
      );
      if (first) {
        fd.append("landImage", first, first.name ?? "landImage");
      }
    }

    return fd;
  };

  const uploadToServer = async (data) => {
    const fd = buildMultipart(data);

    const uploadUrl = "http://localhost:8080/farmland-upload";
    console.log("🚀 업로드 요청 URL:", uploadUrl);

    console.group("📦 업로드 데이터(FormData entries)");
    for (let [key, value] of fd.entries()) {
      if (value instanceof File) {
        console.log(`${key}: [File] name=${value.name}, size=${value.size}B`);
      } else {
        console.log(`${key}:`, value);
      }
    }
    console.groupEnd();

    const token = localStorage.getItem("accessToken");
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

    console.log("🌐 fetch POST ->", uploadUrl);

    const res = await fetch(uploadUrl, { method: "POST", headers, body: fd });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("🔎 서버 에러 세부:", {
        status: res.status,
        statusText: res.statusText,
        headers: Object.fromEntries(res.headers.entries()),
        body: text,
      });
      throw new Error(`업로드 실패(${res.status}) ${res.statusText} ${text}`);
    }
    return res.json().catch(() => ({}));
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    try {
      setIsSubmitting(true);
      if (onSubmit) onSubmit(formData);

      console.group("📝 제출 시작 - 현재 formData 상태");
      console.log(formData);
      console.groupEnd();

      await uploadToServer(formData);

      alert("등록이 완료되었습니다!");
      navigate("/SeniorMain");
    } catch (err) {
      console.error("❌ 업로드 중 오류:", err);
      alert(err?.message || "업로드 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="FarmlandRegistration-Wrapper">
      <FloatingEmojis />
      <button
        className="SeniorProfile-BackButton"
        onClick={() => navigate("/SeniorMain")}
        disabled={isSubmitting}
      >
        ⬅ 홈으로
      </button>

      <main className="FarmlandRegistration-FlowContainer">
        <div className="FarmlandRegistration-Progress">Step {step} / 7</div>

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
            isSubmitting={isSubmitting}
          />
        )}
      </main>

      <aside className="FarmlandRegistration-Summary">
        <div className="FarmlandRegistration-inputSumTitle">입력 정보 요약</div>

        <div className="FarmlandRegistration-SummaryGrid">
          <div>🌾 농지명: {formData.landName || "미입력"}</div>
          <div>📍 행정주소: {formData.address || "미입력"}</div>
          <div>🚏 도로명 주소: {formData.roadAddress || "미입력"}</div>
          <div>🏷️ 지번: {formData.landNumber || "미입력"}</div>
          <div>📍 위도/경도: {formData.lat || "?"}, {formData.lng || "?"}</div>

          <div className="divider"></div>

          <div>🌾 작물: {formData.crop || "미입력"}</div>
          <div>
            📐 면적: {formData.areaSquare || "?"}㎡ / {formData.areaHectare || "?"}ha
          </div>

          <div className="divider"></div>

          <div>🧱 토양: {formData.soilType || "미입력"}</div>
          <div>💧 용수: {formData.waterSource || "미입력"}</div>
          <div>
            👤 소유자: {formData.owner || "미입력"} ({formData.ownerAge || "?"}세)
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

