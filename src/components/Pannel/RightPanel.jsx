// RightPanel.jsx
import "./RightPanel.css";

function RightPanel({ selected, onClose }) {
  if (!selected) return null;

  return (
    <div className="RightContainer">
      <button className="CloseButton" onClick={onClose}>✕</button>

      {/* 이미지 자리 (현재는 회색 박스) */}
      <div className="ImagePlaceholder">사진 자리</div>

      {/* 농지 정보 박스 */}
      <div className="InfoBlock">
        <h2 className="FarmlandName">
          {selected.emoji} {selected.name}
        </h2>
        <div className="InfoRow"><strong>📍 주소:</strong> {selected.address}</div>
        <div className="InfoRow"><strong>🌱 작물:</strong> {selected.crop}</div>
        <div className="InfoRow"><strong>📐 면적:</strong> {selected.area} ㎡</div>
        <div className="InfoRow"><strong>💰 가격:</strong> {selected.price.toLocaleString()} 만원</div>
        <div className="InfoRow"><strong>🧭 좌표:</strong> {selected.lat}, {selected.lng}</div>
      </div>
    </div>
  );
}

export default RightPanel;
