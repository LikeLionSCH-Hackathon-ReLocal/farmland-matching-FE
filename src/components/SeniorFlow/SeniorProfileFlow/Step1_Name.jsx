import { useEffect, useRef, useState } from "react";

export default function Step1_Name({ profile, updateProfile, onNext }) {
  const [touched, setTouched] = useState(false);
  const inputRef = useRef(null);
  useEffect(() => { inputRef.current?.focus(); }, []);

  const name = (profile?.name ?? "").trim();
  const valid = /^[가-힣a-zA-Z\s]{2,20}$/.test(name);

  const handleChange = (e) => {
    const cleaned = e.target.value.replace(/[^가-힣a-zA-Z\s]/g, "").replace(/\s{2,}/g, " ");
    updateProfile("name", cleaned);
  };

  const handleNext = () => {
    setTouched(true);
    if (valid) onNext();
  };

  return (
    <div className="SeniorProfile-Step">
      <h2>성함이 어떻게 되시나요?</h2>
      <input
        ref={inputRef}
        className={`Input ${touched && !valid ? "SeniorProfile-Input--error" : ""}`}
        placeholder="예: 홍길동"
        value={profile?.name ?? ""}
        onChange={handleChange}
      />
      <p className="SeniorProfile-Help">• 한글/영문 2~20자</p>
      <div className="SeniorProfile-Buttons">
        <button className="SeniorProfile-Next" disabled={!valid} onClick={handleNext}>다음</button>
      </div>
    </div>
  );
}
