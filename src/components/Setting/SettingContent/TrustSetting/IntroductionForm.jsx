import React from "react";
import "./IntroductionForm.css";

export default function IntroductionForm() {
  return (
    <div className="intro-form-container">
      <FormRow label="자기 소개">
        <textarea
          className="textarea"
          placeholder="자기 소개 입력 (필수)"
          rows={6}
        />
      </FormRow>

      <FormRow label="자기 소개 영상">
        <input
          type="text"
          className="input"
          placeholder="자기 소개 영상 URL 입력 (선택)"
        />
      </FormRow>

      <FormRow label="SNS">
        <input type="text" className="input" placeholder="SNS 아이디 입력 (선택)" />
      </FormRow>

      <FormRow label="개인 성향">
        <input
          type="text"
          className="input"
          placeholder="개인 성향 입력 (선택)"
        />
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
