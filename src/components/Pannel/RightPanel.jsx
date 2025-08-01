import "./RightPanel.css";

function RightPanel({ selected }) {
  if (!selected) {
    return (
      <div className="RightContainer">
        <p>📋 농지를 선택해주세요</p>
      </div>
    );
  }

  return (
    <div className="RightContainer">
      <h3>{selected.emoji} {selected.name}</h3>
      <p>🆔 ID: {selected.id}</p>
      <p>📍 위치: {selected.lat}, {selected.lng}</p>
      {/* 추후 면적, 용도 등 필드 추가 가능 */}
    </div>
  );
}

export default RightPanel;
