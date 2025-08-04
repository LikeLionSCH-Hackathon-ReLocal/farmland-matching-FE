
function Step2_Crop({ data, updateData, onNext, onBack }) {
  const handleAreaSquare = (v) => {
    updateData("areaSquare", v);
    const num = parseFloat(v);
    if (!isNaN(num)) {
      updateData("areaHectare", (num / 10000).toFixed(4));
    }
  };

  const canNext = data.crop && data.areaSquare;

  return (
    <div className="Step">
      <h2>Step 2. 최근 재배 작물과 면적</h2>

      <label>재배 작물</label>
      <select
        className="InputField"
        value={data.crop}
        onChange={(e) => updateData("crop", e.target.value)}
      >
        <option value="">선택</option>
        <option value="사과">사과</option>
        <option value="배">배</option>
        <option value="벼">벼</option>
        <option value="고추">고추</option>
        <option value="마늘">마늘</option>
      </select>

      <label>면적(㎡)</label>
      <input
        className="InputField"
        type="number"
        min="1"
        placeholder="예: 863"
        value={data.areaSquare}
        onChange={(e) => handleAreaSquare(e.target.value)}
      />

      <label>면적(ha)</label>
      <input
        className="InputField"
        placeholder="자동 계산"
        value={data.areaHectare}
        onChange={(e) => updateData("areaHectare", e.target.value)}
      />

      <div className="ButtonGroup">
        <button onClick={onBack}>이전</button>
        <button disabled={!canNext} onClick={onNext}>다음</button>
      </div>
    </div>
  );
}

export default Step2_Crop;
