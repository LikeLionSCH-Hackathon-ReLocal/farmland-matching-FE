import { useState } from "react";
import "./Certification.css";

export default function Certification({ data, updateData, onSubmit }) {
  const [certificates, setCertificates] = useState([]);
  const [crops, setCrops] = useState([]);
  const [tools, setTools] = useState([]);
  const [otherTrade, setOtherTrade] = useState(""); // 기타 거래 형태
  const [leasePeriod, setLeasePeriod] = useState(""); // 임대 기간

  const tradeOptions = ["토지 매입", "임대", "공유농", "기타"];

  const toggleArrayValue = (key, value) => {
    const arr = new Set(data[key] || []);
    if (arr.has(value)) arr.delete(value);
    else arr.add(value);
    updateData(key, Array.from(arr));
  };

  const handleCertChange = (index, field, value) => {
    const updated = [...certificates];
    updated[index][field] = value;
    setCertificates(updated);
  };

  const addCertificate = () => {
    setCertificates([...certificates, { name: "", file: null }]);
  };

  const handleDynamicChange = (setter, index, value) => {
    setter((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const addDynamicField = (setter) => {
    setter((prev) => [...prev, ""]);
  };

  const handleFinalSubmit = () => {
    updateData("certificates", certificates);
    updateData("crops", crops.filter(Boolean));
    updateData("tools", tools.filter(Boolean));
    updateData("leasePeriod", leasePeriod);   // 임대 기간 저장
    updateData("otherTrade", otherTrade);     // 기타 거래 형태 저장
    onSubmit();
  };

  return (
    <div className="Certification-Container">
      <label>자격증, 관심 작물, 사용할 장비에 대해 입력해보세요.</label>

      {/* 자격증 */}
      <div className="Certification-Section">
        <label>자격증</label>
        {certificates.map((cert, index) => (
          <div className="Certification-RowGrid" key={index}>
            <input
              type="text"
              placeholder="자격증 이름"
              value={cert.name}
              onChange={(e) => handleCertChange(index, "name", e.target.value)}
              className="Certification-Input"
            />
            <input
              type="file"
              accept=".pdf"
              onChange={(e) =>
                handleCertChange(index, "file", e.target.files[0])
              }
              className="Certification-Input"
            />
            <button
              className="Certification-DeleteButton"
              onClick={() =>
                setCertificates((prev) => prev.filter((_, i) => i !== index))
              }
            >
              삭제
            </button>
          </div>
        ))}
        <button onClick={addCertificate} className="Certification-AddButton">
          + 자격증 추가
        </button>
      </div>

      {/* 관심 작물 */}
      <div className="Certification-Section">
        <label>관심 작물</label>
        {crops.map((crop, index) => (
          <div className="Certification-RowGrid" key={index}>
            <input
              type="text"
              placeholder="관심 작물"
              value={crop}
              onChange={(e) =>
                handleDynamicChange(setCrops, index, e.target.value)
              }
              className="Certification-Input"
            />
            <div></div>
            <button
              className="Certification-DeleteButton"
              onClick={() =>
                setCrops((prev) => prev.filter((_, i) => i !== index))
              }
            >
              삭제
            </button>
          </div>
        ))}
        <button
          onClick={() => addDynamicField(setCrops)}
          className="Certification-AddButton"
        >
          + 작물 추가
        </button>
      </div>

      {/* 사용 장비 */}
      <div className="Certification-Section">
        <label>사용 장비</label>
        {tools.map((tool, index) => (
          <div className="Certification-RowGrid" key={index}>
            <input
              type="text"
              placeholder="예: 트랙터"
              value={tool}
              onChange={(e) =>
                handleDynamicChange(setTools, index, e.target.value)
              }
              className="Certification-Input"
            />
            <div></div>
            <button
              className="Certification-DeleteButton"
              onClick={() =>
                setTools((prev) => prev.filter((_, i) => i !== index))
              }
            >
              삭제
            </button>
          </div>
        ))}
        <button
          onClick={() => addDynamicField(setTools)}
          className="Certification-AddButton"
        >
          + 장비 추가
        </button>
      </div>

      {/* 거래 형태 + 확장 입력 */}
      <div className="Certification-Section">
        <label>거래 형태</label>
        <div className="Certification-TagContainer">
          {tradeOptions.map((type) => (
            <button
              key={type}
              type="button"
              className={`Certification-TagButton ${
                data.trades?.includes(type) ? "selected" : ""
              }`}
              onClick={() => toggleArrayValue("trades", type)}
            >
              {type}
            </button>
          ))}
        </div>

        {/* 조건부 입력 필드 */}
        {data.trades?.includes("임대") && (
          <input
            type="text"
            placeholder="임대 기간 (예: 2년)"
            value={leasePeriod}
            onChange={(e) => setLeasePeriod(e.target.value)}
            className="Certification-Input"
          />
        )}
        {data.trades?.includes("기타") && (
          <input
            type="text"
            placeholder="기타 거래 형태를 입력해주세요"
            value={otherTrade}
            onChange={(e) => setOtherTrade(e.target.value)}
            className="Certification-Input"
          />
        )}
      </div>

      {/* 한마디 소개 */}
      <div className="Certification-Section">
        <label>한마디 소개</label>
        <textarea
          className="Certification-Textarea"
          rows={2}
          placeholder="예: 도시 농업에서 시작해 귀농을 준비 중입니다."
          value={data.comment || ""}
          onChange={(e) => updateData("comment", e.target.value)}
        />
      </div>

      {/* 제출 */}
      <button
        className="Certification-SubmitButton"
        onClick={handleFinalSubmit}
      >
        제출하기
      </button>
    </div>
  );
}
