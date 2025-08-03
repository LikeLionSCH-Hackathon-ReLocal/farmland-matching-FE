function Step3_Condition({ onNext, onBack, updateData }) {
  return (
    <div className="Step">
      <h2>원하시는 청년 농부 조건이 있으신가요?</h2>
      <input
        className="InputField"
        placeholder="예: 근처에 거주하는 분"
        onChange={(e) => updateData("condition", e.target.value)}
      />
      <div className="ButtonGroup">
        <button onClick={onBack}>이전</button>
        <button onClick={onNext}>다음</button>
      </div>
    </div>
  );
}

export default Step3_Condition;
