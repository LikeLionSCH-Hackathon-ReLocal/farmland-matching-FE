function Step2_Crop({ onNext, onBack, updateData }) {
  return (
    <div className="Step">
      <h2>경작하신 작물을 선택해주세요</h2>
      <select onChange={(e) => updateData("crop", e.target.value)}>
        <option value="">선택</option>
        <option value="벼">벼</option>
        <option value="고추">고추</option>
        <option value="마늘">마늘</option>
      </select>
      <div className="ButtonGroup">
        <button onClick={onBack}>이전</button>
        <button onClick={onNext}>다음</button>
      </div>
    </div>
  );
}

export default Step2_Crop;
