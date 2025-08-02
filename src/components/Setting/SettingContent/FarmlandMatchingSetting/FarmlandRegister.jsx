// components/Setting/FarmlandMatchingSetting/FarmlandRegister.jsx
import React, { useState } from "react";

export default function FarmlandRegister() {
  const [form, setForm] = useState({
    owner: "",
    location: "",
    area: "",
    usage: "",
    soil: "",
    water: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("농지 등록 데이터:", form);
    alert("농지가 등록되었습니다!");
  };

  return (
    <form className="FarmlandRegisterForm" onSubmit={handleSubmit}>
      <div className="FormSection">
        <label>소유자명</label>
        <input name="owner" value={form.owner} onChange={handleChange} />
      </div>
      <div className="FormSection">
        <label>주소</label>
        <input name="location" value={form.location} onChange={handleChange} />
      </div>
      <div className="FormSection">
        <label>면적 (ha)</label>
        <input name="area" value={form.area} onChange={handleChange} />
      </div>
      <div className="FormSection">
        <label>토지 용도</label>
        <input name="usage" value={form.usage} onChange={handleChange} />
      </div>
      <div className="FormSection">
        <label>토양 유형</label>
        <input name="soil" value={form.soil} onChange={handleChange} />
      </div>
      <div className="FormSection">
        <label>용수 공급</label>
        <input name="water" value={form.water} onChange={handleChange} />
      </div>
      <div className="FormSection">
        <label>기타 설명</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="SubmitButton">
        등록
      </button>
    </form>
  );
}
