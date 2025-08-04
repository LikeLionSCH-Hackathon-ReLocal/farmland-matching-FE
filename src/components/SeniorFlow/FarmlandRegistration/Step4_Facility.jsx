
function Check({ label, value, checked, onChange }) {
  return (
    <label className="CheckItem">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(value, e.target.checked)}
      />
      <span>{label}</span>
    </label>
  );
}

function Step4_Facility({ data, updateData, updateArray, onNext, onBack }) {
  const canNext = data.hasWater !== "" && data.hasElectricity !== "" && data.machineAccess !== "";

  return (
    <div className="Step">
      <h2>Step 4. 기반시설</h2>

      <label>농업용수</label>
      <select
        className="InputField"
        value={data.hasWater}
        onChange={(e) => updateData("hasWater", e.target.value)}
      >
        <option value="">선택</option>
        <option value="있음">있음</option>
        <option value="없음">없음</option>
      </select>

      <label>전기</label>
      <select
        className="InputField"
        value={data.hasElectricity}
        onChange={(e) => updateData("hasElectricity", e.target.value)}
      >
        <option value="">선택</option>
        <option value="있음">있음</option>
        <option value="없음">없음</option>
      </select>

      <label>농기계 접근</label>
      <select
        className="InputField"
        value={data.machineAccess}
        onChange={(e) => updateData("machineAccess", e.target.value)}
      >
        <option value="">선택</option>
        <option value="가능">가능</option>
        <option value="불가">불가</option>
      </select>

      <div className="FieldGroup">
        <div className="FieldLabel">시설 (복수 선택)</div>
        <div className="Checks">
          {["창고", "비닐하우스", "울타리"].map((f) => (
            <Check
              key={f}
              label={f}
              value={f}
              checked={(data.facilities || []).includes(f)}
              onChange={(value, checked) => updateArray("facilities", value, checked)}
            />
          ))}
        </div>
      </div>

      <div className="ButtonGroup">
        <button onClick={onBack}>이전</button>
        <button disabled={!canNext} onClick={onNext}>다음</button>
      </div>
    </div>
  );
}

export default Step4_Facility;
