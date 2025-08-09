import React, { useEffect, useMemo, useState } from "react";
import "./RecommenderForm.css";

/**
 * props
 * - user: YoungUser 객체(SettingModal에서 내려줌)
 * - onUserChange(updatedUser): YoungUser 저장 콜백
 */
export default function RecommenderForm({ user, onUserChange }) {
  // 추천인 행: { name, relation, phone, mail }
  const [rows, setRows] = useState([
    { name: "", relation: "", phone: "", mail: "" },
  ]);

  // 초기값: user.detail.recommand1/2/3 → rows
  useEffect(() => {
    if (!user) return;
    const r1 = user.detail?.recommand1 || null;
    const r2 = user.detail?.recommand2 || null;
    const r3 = user.detail?.recommand3 || null;

    const pack = (r) =>
      r
        ? {
            name: r.name || "",
            relation: r.rel || r.relation || "",
            phone: r.phone || "",
            mail: r.mail || "",
          }
        : null;

    const initial = [pack(r1), pack(r2), pack(r3)].filter(Boolean);
    setRows(
      initial.length
        ? initial
        : [{ name: "", relation: "", phone: "", mail: "" }]
    );
  }, [user]);

  // 행 조작
  const handleAddRow = () =>
    setRows((prev) => [
      ...prev,
      { name: "", relation: "", phone: "", mail: "" },
    ]);
  const handleRemoveRow = (index) =>
    setRows((prev) => prev.filter((_, i) => i !== index));
  const handleChange = (index, field, value) =>
    setRows((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });

  // 저장 가능 여부(한 칸이라도 입력돼 있으면 저장 허용)
  const canSave = useMemo(
    () =>
      rows.some((r) => (r.name || r.relation || r.phone || r.mail).trim?.()),
    [rows]
  );

  // 저장 → YoungUser.detail에 반영
  const handleSave = () => {
    if (!user) return;

    // 앞의 3개는 기존 구조(recommand1~3)에 매핑, 전체는 배열로도 보관
    const sanitized = rows
      .map((r) => ({
        name: (r.name || "").trim(),
        relation: (r.relation || "").trim(),
        phone: (r.phone || "").trim(),
        mail: (r.mail || "").trim(),
      }))
      .filter((r) => r.name || r.relation || r.phone || r.mail);

    const toRecommandObj = (r) => ({
      name: r.name,
      rel: r.relation,
      phone: r.phone,
      mail: r.mail,
    });

    const updated = {
      ...user,
      detail: {
        ...user.detail,
        // 기존 키 유지(+가능한 경우 덮어씀)
        recommand1: sanitized[0] ? toRecommandObj(sanitized[0]) : undefined,
        recommand2: sanitized[1] ? toRecommandObj(sanitized[1]) : undefined,
        recommand3: sanitized[2] ? toRecommandObj(sanitized[2]) : undefined,
        // 배열 버전도 추가(다른 화면에서 쓰기 용이)
        recommendersList: sanitized, // [{name, relation, phone, mail}]
      },
    };

    onUserChange?.(updated);
    alert("추천인 정보가 저장되었습니다.");
    console.log("✅ Saved recommenders:", updated.detail);
  };

  return (
    <div className="RecommenderForm-container">
      <div className="RecommenderForm-title">추천인 등록</div>
      <div className="RecommenderForm-description">
        추천인은 해당 청년이{" "}
        <strong>얼마나 성실하고 농업에 관심이 있는지</strong>를 신뢰 기반으로
        증명해줄 수 있는 분입니다.
        <br />
        저장 후 추천인에게 <strong>메일 또는 문자로 인증 요청</strong>을 보낼 수
        있습니다. (추후 API 연동)
      </div>

      {rows.map((row, index) => (
        <div className="RecommenderForm-row" key={index}>
          <input
            className="RecommenderForm-input name"
            placeholder="이름"
            value={row.name}
            onChange={(e) => handleChange(index, "name", e.target.value)}
          />
          <input
            className="RecommenderForm-input relation"
            placeholder="관계 (예: 지도교수, 이장)"
            value={row.relation}
            onChange={(e) => handleChange(index, "relation", e.target.value)}
          />
          <input
            className="RecommenderForm-input phone"
            placeholder="전화번호"
            value={row.phone}
            onChange={(e) => handleChange(index, "phone", e.target.value)}
          />
          <input
            className="RecommenderForm-input mail"
            placeholder="메일"
            value={row.mail}
            onChange={(e) => handleChange(index, "mail", e.target.value)}
          />
          <button
            className="RecommenderForm-remove-line"
            onClick={() => handleRemoveRow(index)}
            title="이 행 삭제"
            aria-label="이 행 삭제"
            type="button"
          >
            −
          </button>
        </div>
      ))}

      <div className="RecommenderForm-add-button-wrapper">
        <button className="RecommenderForm-add-btn" onClick={handleAddRow}>
          +
        </button>
      </div>

      {/* 하단 액션 */}
      <div
        style={{
          display: "flex",
          gap: "0.6rem",
          justifyContent: "flex-end",
          marginTop: "1rem",
        }}
      >
        <button
          className="RecommenderForm-add-btn"
          style={{
            width: "auto",
            height: "auto",
            borderRadius: "10px",
            padding: "0.6rem 1rem",
          }}
          disabled={!canSave}
          onClick={handleSave}
          title={!canSave ? "내용을 입력해 주세요" : "추천인 저장"}
        >
          저장
        </button>
      </div>
    </div>
  );
}
