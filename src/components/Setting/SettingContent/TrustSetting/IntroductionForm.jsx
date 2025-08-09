import React, { useEffect, useMemo, useState } from "react";
import "./IntroductionForm.css";

export default function IntroductionForm({ user, onUserChange }) {
  // YoungUser.detail.intro: { OneWord, PullWord, video, sns, personal }
  const [oneLine, setOneLine] = useState("");
  const [intro, setIntro] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [sns, setSns] = useState("");
  const [personal, setPersonal] = useState("");

  const ONE_LINE_MAX = 80;

  useEffect(() => {
    const i = user?.detail?.intro || {};
    setOneLine(i.OneWord || "");
    setIntro(i.PullWord || "");
    setVideoUrl(i.video || "");
    setSns(i.sns || "");
    setPersonal(i.personal || "");
  }, [user]);

  const canSave = useMemo(
    () => oneLine.trim().length > 0 && intro.trim().length > 0,
    [oneLine, intro]
  );

  const onSave = () => {
    if (!user) return;
    const updated = {
      ...user,
      detail: {
        ...user.detail,
        intro: {
          ...user.detail?.intro,
          OneWord: oneLine.trim(),
          PullWord: intro.trim(),
          video: videoUrl.trim(),
          sns: sns.trim(),
          personal: personal.trim(),
        },
      },
    };
    onUserChange?.(updated);
    alert("자기소개가 저장되었습니다.");
    console.log("✅ Saved intro:", updated.detail.intro);
  };

  return (
    <div className="IntroForm-root">
      <div className="IntroForm-card">
        <FormRow label="대표 한마디">
          <div className="IntroForm-inputWrap">
            <input
              className="IntroForm-input"
              placeholder={`예) ${ONE_LINE_MAX}자 이내로 핵심만 적어주세요`}
              value={oneLine}
              maxLength={ONE_LINE_MAX}
              onChange={(e) => setOneLine(e.target.value)}
              aria-label="대표 한마디"
            />
            <div className="IntroForm-counter">
              {oneLine.length} / {ONE_LINE_MAX}
            </div>
          </div>
        </FormRow>

        <FormRow label="자기 소개">
          <textarea
            className="IntroForm-textarea"
            placeholder="자기소개(필수) — 동기, 경험, 목표 등을 자세히 적어주세요."
            rows={8}
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
            aria-label="자기 소개"
          />
        </FormRow>

        <FormRow label="자기소개 영상">
          <input
            type="text"
            className="IntroForm-input"
            placeholder="YouTube 등 영상 URL (선택)"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            aria-label="자기소개 영상 URL"
          />
        </FormRow>

        <FormRow label="SNS">
          <input
            type="text"
            className="IntroForm-input"
            placeholder="SNS 아이디 또는 링크 (선택)"
            value={sns}
            onChange={(e) => setSns(e.target.value)}
            aria-label="SNS"
          />
        </FormRow>

        <FormRow label="개인 성향">
          <input
            type="text"
            className="IntroForm-input"
            placeholder="예: 단체생활, 성실, 관계중시 (쉼표로 구분 가능)"
            value={personal}
            onChange={(e) => setPersonal(e.target.value)}
            aria-label="개인 성향"
          />
        </FormRow>

        <div className="IntroForm-actions">
          <button
            className="IntroForm-save"
            disabled={!canSave}
            onClick={onSave}
            title={!canSave ? "대표 한마디와 자기소개는 필수입니다." : "저장"}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}

function FormRow({ label, children }) {
  return (
    <div className="IntroForm-row">
      <label className="IntroForm-label">{label}</label>
      <div className="IntroForm-inputWrap">{children}</div>
    </div>
  );
}
