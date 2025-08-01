import React from "react";
import "./TrustProfileForm.css";

export default function TrustProfileForm() {
  return (
    <div className="form-container">
      <FormRow label="자격증">
        <input className="input" placeholder="자격증 종류 입력 + pdf 첨부 (선택)" />
        <span className="more">더보기 ▾</span>
      </FormRow>

      <FormRow label="수상 / 활동 경력">
        <input className="input" placeholder="수상 / 활동 입력 (선택)" />
        <span className="more">더보기 ▾</span>
      </FormRow>

      <FormRow label="농업 동기">
        <input className="input" placeholder="농업 동기 입력 (선택)" />
        <span className="more">더보기 ▾</span>
      </FormRow>

      <FormRow label="농업 경험 및 작물">
        <input className="input" placeholder="농업 경험 및 작물 입력 (선택)" />
        <span className="more">더보기 ▾</span>
      </FormRow>

      <FormRow label="거래 형태">
        <select className="select">
          <option value="">선택 (필수)</option>
          <option value="">매매</option>
          <option value="임대">임대</option>
          <option value="기타">기타</option>
        </select>
      </FormRow>
    </div>
  );
}

function FormRow({ label, children }) {
  return (
    <div className="form-row">
      <label className="form-label">{label}</label>
      <div className="form-input-wrapper">{children}</div>
    </div>
  );
}
