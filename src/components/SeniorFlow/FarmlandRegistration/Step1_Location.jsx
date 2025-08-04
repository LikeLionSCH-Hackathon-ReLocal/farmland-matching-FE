
function Step1_Location({ data, updateData, onNext }) {
  const canNext = data.address && data.landNumber;

  return (
    <div className="Step">
      <h2>Step 1. 농지 위치를 알려주세요</h2>

      <label>행정주소</label>
      <input
        className="InputField"
        placeholder="예: 충남 아산시 신창면"
        value={data.address}
        onChange={(e) => updateData("address", e.target.value)}
      />

      <label>도로명 주소 (선택)</label>
      <input
        className="InputField"
        placeholder="예: 충남 아산시 신창면 OO로 12"
        value={data.roadAddress}
        onChange={(e) => updateData("roadAddress", e.target.value)}
      />

      <label>지번</label>
      <input
        className="InputField"
        placeholder="예: 631-4"
        value={data.landNumber}
        onChange={(e) => updateData("landNumber", e.target.value)}
      />

      <div className="Row">
        <div className="Col">
          <label>위도 (선택)</label>
          <input
            className="InputField"
            placeholder="36.733462"
            value={data.lat}
            onChange={(e) => updateData("lat", e.target.value)}
          />
        </div>
        <div className="Col">
          <label>경도 (선택)</label>
          <input
            className="InputField"
            placeholder="126.961405"
            value={data.lng}
            onChange={(e) => updateData("lng", e.target.value)}
          />
        </div>
      </div>

      <button className="NextButton" disabled={!canNext} onClick={onNext}>
        다음
      </button>
    </div>
  );
}

export default Step1_Location;
