import React, { useState } from "react";
import "./RecommenderForm.css";

export default function RecommenderForm() {
  const [rows, setRows] = useState([{ name: "", relation: "", phone: "" }]);

  const handleAddRow = () => {
    setRows([...rows, { name: "", relation: "", phone: "" }]);
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
    <div className="recommender-container">
      <div className="form-title">추천인 등록</div>
      {rows.map((row, index) => (
        <div className="recommender-row" key={index}>
          <input
            className="input"
            placeholder="이름"
            value={row.name}
            onChange={(e) => handleChange(index, "name", e.target.value)}
          />
          <input
            className="input"
            placeholder="관계"
            value={row.relation}
            onChange={(e) => handleChange(index, "relation", e.target.value)}
          />
          <input
            className="input phone"
            placeholder="전화번호"
            value={row.phone}
            onChange={(e) => handleChange(index, "phone", e.target.value)}
          />
          {index >= 1 && (
            <button
              className="remove-btn"
              onClick={() => handleRemoveRow(index)}
            >
              −
            </button>
          )}
        </div>
      ))}

      <div className="add-button-wrapper">
        <button className="add-btn" onClick={handleAddRow}>
          +
        </button>
      </div>
    </div>
  );
}
