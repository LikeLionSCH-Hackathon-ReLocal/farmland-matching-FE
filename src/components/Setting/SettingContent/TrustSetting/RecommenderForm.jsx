import React, { useState } from "react";
import "./RecommenderForm.css";

export default function RecommenderForm() {
  const [rows, setRows] = useState([{ name: "", relation: "", phone: "" , mail:""}]);

  const handleAddRow = () => {
    setRows([...rows, { name: "", relation: "", phone: "" , mail: ""}]);
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
