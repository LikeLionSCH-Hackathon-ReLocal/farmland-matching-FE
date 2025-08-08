import React, { useState } from "react";
import "./RecommenderForm.css";

export default function RecommenderForm() {
  const [rows, setRows] = useState([
    { name: "", relation: "", phone: "", mail: "" },
  ]);

  const handleAddRow = () => {
    setRows([...rows, { name: "", relation: "", phone: "", mail: "" }]);
  };

  const handleRemoveRow = (index) => {
    const updated = rows.filter((_, i) => i !== index);
    setRows(updated);
  };

  const handleChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  return (
    <div className="RecommenderForm-container">
      <div className="RecommenderForm-title">추천인 등록</div>
      <div className="RecommenderForm-description">
        추천인은 해당 청년이{" "}
        <strong>얼마나 성실하고 농업에 관심이 있는지</strong>를 신뢰 기반으로
        증명해줄 수 있는 사람입니다.
        <br />
        추천인 정보를 등록하면 해당 추천인에게{" "}
        <strong>메일 또는 문자로 인증 요청</strong>이 발송됩니다.
        <br />
        추천인은 간단한 인증 절차를 통해 청년을 추천하며, 이는{" "}
        <strong>신뢰 점수</strong>에 반영됩니다.
      </div>
      {rows.map((row, index) => (
        <div className="RecommenderForm-row" key={index}>
          <input
            className="RecommenderForm-input"
            placeholder="이름"
            value={row.name}
            onChange={(e) => handleChange(index, "name", e.target.value)}
          />
          <input
            className="RecommenderForm-input"
            placeholder="관계"
            value={row.relation}
            onChange={(e) => handleChange(index, "relation", e.target.value)}
          />
          <input
            className="RecommenderForm-input"
            placeholder="전화번호"
            value={row.phone}
            onChange={(e) => handleChange(index, "phone", e.target.value)}
          />
          <input
            className="RecommenderForm-input"
            placeholder="메일"
            value={row.phone}
            onChange={(e) => handleChange(index, "mail", e.target.value)}
          />
          {index >= 1 && (
            <button
              className="RecommenderForm-remove-btn"
              onClick={() => handleRemoveRow(index)}
            >
              −
            </button>
          )}
        </div>
      ))}

      <div className="RecommenderForm-add-button-wrapper">
        <button className="RecommenderForm-add-btn" onClick={handleAddRow}>
          +
        </button>
      </div>
    </div>
  );
}
