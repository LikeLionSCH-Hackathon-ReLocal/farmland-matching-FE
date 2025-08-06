import React from "react";
import "./Certification.css";

export default function Certification() {
  return (
    <div className="Certification-container">
      <FormRow label="자격증" large>
        <input className="Certification-input" placeholder="자격증 종류 입력 + pdf 첨부 (선택)" />
        <span className="Certification-more">더보기 ▾</span>
      </FormRow>

      <FormRow label="수상 / 활동 경력" large>
        <input className="Certification-input" placeholder="수상 / 활동 입력 (선택)" />
        <span className="Certification-more">더보기 ▾</span>
      </FormRow>

      <FormRow label="농업 동기">
        <input className="Certification-input" placeholder="농업 동기 입력 (선택)" />
        <span className="Certification-more">더보기 ▾</span>
      </FormRow>

      <FormRow label="농업 경험 및 작물">
        <input className="Certification-input" placeholder="농업 경험 및 작물 입력 (선택)" />
        <span className="Certification-more">더보기 ▾</span>
      </FormRow>

      <FormRow label="거래 형태">
        <select className="Certification-select">
          <option value="">선택 (필수)</option>
          <option value="매매">매매</option>
          <option value="임대">임대</option>
          <option value="기타">기타</option>
        </select>
      </FormRow>
    </div>
  );
}

function FormRow({ label, children, large }) {
  return (
    <div className="Certification-row">
      <label className={`Certification-label ${large ? "Certification-large" : ""}`}>{label}</label>
      <div className="Certification-input-wrapper">{children}</div>
    </div>
  );
}
