function Step4_Complete({ formData }) {
  return (
    <div className="Step">
      <h2>등록이 완료되었습니다!</h2>
      <p>📍 {formData.location}</p>
      <p>🌱 {formData.crop}</p>
      <p>🔎 {formData.condition}</p>
      <button className="NextButton">매칭 보러가기</button>
    </div>
  );
}

export default Step4_Complete;
