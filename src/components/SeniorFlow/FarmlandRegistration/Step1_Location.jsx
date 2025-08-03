function Step1_Location({ onNext, updateData }) {
  return (
    <div className="Step">
      <h2>농지가 있는 지역을 알려주세요</h2>
      <input
        className="InputField"
        placeholder="예: 충남 아산시 배방읍"
        onChange={(e) => updateData("location", e.target.value)}
      />
      <button className="NextButton" onClick={onNext}>
        다음
      </button>
    </div>
  );
}

export default Step1_Location;
