import { useState } from "react";
import "./Certification.css";

export default function Certification({ data, updateData, updateArray, onSubmit }) {
  const certificateOptions = ["농기계운전기능사", "귀농귀촌인증서", "농업기술사"];
  const cropOptions = ["벼", "과수", "시설채소", "축산", "특작"];
  const toolOptions = ["드론", "트랙터", "콤바인", "관개설비"];
  const tradeOptions = ["토지 매입", "임대", "공유농", "기타"];

  const toggleArrayValue = (key, value) => {
    updateArray(key, value, !(data[key] || []).includes(value));
  };

  return (
    <div className="Certification-Container">
      <div className="Certification-Section">
        <label>자격증</label>
        <div className="Certification-TagContainer">
          {certificateOptions.map((cert) => (
            <button
              key={cert}
              type="button"
              className={`Certification-TagButton ${data.certificates?.includes(cert) ? "selected" : ""}`}
              onClick={() => toggleArrayValue("certificates", cert)}
            >
              {cert}
            </button>
          ))}
        </div>
        <input
          className="Certification-Input"
          type="file"
          accept=".pdf"
          onChange={(e) => updateData("certificateFile", e.target.files[0])}
        />
      </div>

      <div className="Certification-Section">
        <label>관심 작물</label>
        <div className="Certification-TagContainer">
          {cropOptions.map((crop) => (
            <button
              key={crop}
              type="button"
              className={`Certification-TagButton ${data.crops?.includes(crop) ? "selected" : ""}`}
              onClick={() => toggleArrayValue("crops", crop)}
            >
              {crop}
            </button>
          ))}
        </div>
      </div>

      <div className="Certification-Section">
        <label>사용 장비</label>
        <input
          className="Certification-Input"
          type="text"
          placeholder="직접 입력 (예: 드론, 트랙터)"
          value={data.customTools || ""}
          onChange={(e) => updateData("customTools", e.target.value)}
        />
        <div className="Certification-TagContainer">
          {toolOptions.map((tool) => (
            <button
              key={tool}
              type="button"
              className={`Certification-TagButton ${data.tools?.includes(tool) ? "selected" : ""}`}
              onClick={() => toggleArrayValue("tools", tool)}
            >
              {tool}
            </button>
          ))}
        </div>
      </div>

      <div className="Certification-Section">
        <label>거래 형태</label>
        <div className="Certification-TagContainer">
          {tradeOptions.map((type) => (
            <button
              key={type}
              type="button"
              className={`Certification-TagButton ${data.trades?.includes(type) ? "selected" : ""}`}
              onClick={() => toggleArrayValue("trades", type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

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

      <button className="Certification-SubmitButton" onClick={onSubmit}>
        제출하기
      </button>
    </div>
  );
}
