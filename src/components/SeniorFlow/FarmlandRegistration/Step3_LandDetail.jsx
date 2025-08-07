
function Step3_LandDetail({ data, updateData, onNext, onBack }) {
  const canNext = data.soilType && data.waterSource && data.owner;

  return (
    <div className="FarmlandRegistration-Step">
      <h2>Step 3. 토지 상세 정보</h2>

      <label>토양 형태</label>
      <select
        className="FarmlandRegistration-InputField"
        value={data.soilType}
        onChange={(e) => updateData("soilType", e.target.value)}
      >
        <option value="">선택</option>
        <option value="사질양토">사질양토</option>
        <option value="양토">양토</option>
        <option value="미사질식양토">미사질식양토</option>
      </select>

      <label>용수 접근성</label>
      <input
        className="FarmlandRegistration-InputField"
        placeholder="예: 인근 하천과 연결됨"
        value={data.waterSource}
        onChange={(e) => updateData("waterSource", e.target.value)}
      />

      <label>소유자 이름</label>
      <input
        className="FarmlandRegistration-InputField"
        placeholder="예: 이말순"
        value={data.owner}
        onChange={(e) => updateData("owner", e.target.value)}
      />

      <div className="FarmlandRegistration-Row">
        <div className="FarmlandRegistration-Col">
          <label>소유자 연령 (선택)</label>
          <input
            className="FarmlandRegistration-InputField"
            type="number"
            min="0"
            placeholder="예: 75"
            value={data.ownerAge}
            onChange={(e) => updateData("ownerAge", e.target.value)}
          />
        </div>
        <div className="FarmlandRegistration-Col">
          <label>거주지 (선택)</label>
          <input
            className="FarmlandRegistration-InputField"
            placeholder="예: 순천향대"
            value={data.home}
            onChange={(e) => updateData("home", e.target.value)}
          />
        </div>
      </div>

      <label>등록일 (선택)</label>
      <input
        className="FarmlandRegistration-InputField"
        type="date"
        value={data.registerDate}
        onChange={(e) => updateData("registerDate", e.target.value)}
      />

      <div className="FarmlandRegistration-ButtonGroup">
        <div className="FarmlandRegistration-Button" onClick={onBack}>
          이전
        </div>
        <div
          className={`FarmlandRegistration-Button ${
            !canNext ? "disabled" : ""
          }`}
          onClick={canNext ? onNext : undefined}
        >
          다음
        </div>
      </div>
    </div>
  );
}

export default Step3_LandDetail;
