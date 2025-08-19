function Step2_Crop({ data, updateData, onNext, onBack }) {
  const toNum = (v) => {
    if (v === null || v === undefined) return NaN;
    const s = String(v).trim();
    if (s === "") return NaN;
    const n = Number(s);
    return Number.isFinite(n) ? n : NaN;
  };

  const handleAreaSquare = (v) => {
    updateData("areaSquare", v);
    const num = toNum(v);
    if (!isNaN(num) && num > 0) {
      updateData("areaHectare", (num / 10000).toFixed(4));
    } else if (String(v).trim() === "") {
      // 비움 동기화
      updateData("areaHectare", "");
    } else {
      // 음수/0/NaN 방지
      updateData("areaHectare", "");
    }
  };

  const handleAreaHectare = (v) => {
    updateData("areaHectare", v);
    const num = toNum(v);
    if (!isNaN(num) && num > 0) {
      // 1 ha = 10,000 ㎡
      updateData("areaSquare", Math.round(num * 10000).toString());
    } else if (String(v).trim() === "") {
      updateData("areaSquare", "");
    } else {
      updateData("areaSquare", "");
    }
  };

  const hasValidSquare = (() => {
    const n = toNum(data.areaSquare);
    return !isNaN(n) && n > 0;
  })();

  const hasValidHectare = (() => {
    const n = toNum(data.areaHectare);
    return !isNaN(n) && n > 0;
  })();

  const canNext = !!data.crop && (hasValidSquare || hasValidHectare);

  return (
    <div className="FarmlandRegistration-Step">
      <h2>Step 2. 최근 재배 작물과 면적</h2>

      <label>재배 작물</label>
      <select
        className="FarmlandRegistration-InputField"
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
        className="FarmlandRegistration-InputField"
        type="number"
        min="1"
        step="1"
        inputMode="numeric"
        placeholder="예: 863"
        value={data.areaSquare}
        onChange={(e) => handleAreaSquare(e.target.value)}
      />

      <label>면적(ha)</label>
      <input
        className="FarmlandRegistration-InputField"
        type="number"
        min="0.0001"
        step="0.0001"
        inputMode="decimal"
        placeholder="자동/직접 입력 가능 (예: 0.0863)"
        value={data.areaHectare}
        onChange={(e) => handleAreaHectare(e.target.value)}
      />

      <div className="FarmlandRegistration-ButtonGroup">
        <div className="FarmlandRegistration-Button" onClick={onBack}>
          이전
        </div>
        <div
          className={`FarmlandRegistration-Button ${!canNext ? "disabled" : ""}`}
          onClick={canNext ? onNext : undefined}
          aria-disabled={!canNext}
        >
          다음
        </div>
      </div>
    </div>
  );
}

export default Step2_Crop;
