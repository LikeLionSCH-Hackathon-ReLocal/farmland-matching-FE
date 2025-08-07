import { useState } from "react";
import "./MyRegisteredLand.css";
import FloatingEmojis from "../../../pages/Effect/FloatingEmojis";

const initialDummyLands = [
  {
    id: 1,
    name: "아산 🥔 농지 1",
    location: "충남 아산시 도고면",
    crop: "감자",
    area: 800,
    status: "매칭 대기",
  },
  {
    id: 2,
    name: "아산 🍅 농지 2",
    location: "충남 아산시 배방읍",
    crop: "토마토",
    area: 1200,
    status: "매칭 중",
  },
];

function MyRegisteredLand() {
  const [lands, setLands] = useState(initialDummyLands);
  const [selectedLand, setSelectedLand] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState(null);

  const handleDelete = (id) => {
    const confirmed = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmed) return;
    setLands((prev) => prev.filter((land) => land.id !== id));
    setSelectedLand(null);
    setEditMode(false);
  };

  const handleEditStart = (land) => {
    setEditMode(true);
    setEditForm({ ...land });
  };

  const handleEditChange = (key, value) => {
    setEditForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleEditSave = () => {
    setLands((prev) =>
      prev.map((land) => (land.id === editForm.id ? editForm : land))
    );
    setSelectedLand(editForm);
    setEditMode(false);
  };

  return (
    <div className="MyRegisteredLand-Wrapper">
      <FloatingEmojis />

      <section className="MyRegisteredLand-LeftPanel">
        <h2>📋 내가 등록한 농지 목록</h2>
        {lands.length === 0 ? (
          <p>아직 등록된 농지가 없습니다.</p>
        ) : (
          lands.map((land) => (
            <div key={land.id} className="MyRegisteredLand-LandCard">
              <div className="MyRegisteredLand-LandTitle">{land.name}</div>
              <div className="MyRegisteredLand-LandDetails">
                📍 {land.location} | 🌱 {land.crop} | 📐 {land.area}㎡
              </div>
              <div className="MyRegisteredLand-LandStatus">
                상태: {land.status}
              </div>
              <div className="MyRegisteredLand-ButtonGroup">
                <div
                  className="MyRegisteredLand-Button"
                  onClick={() => {
                    setSelectedLand(land);
                    setEditMode(false);
                  }}
                >
                  자세히 보기
                </div>
                <div
                  className="MyRegisteredLand-Button danger"
                  onClick={() => handleDelete(land.id)}
                >
                  삭제
                </div>
              </div>
            </div>
          ))
        )}
      </section>

      <aside className="MyRegisteredLand-DetailPanel">
        {selectedLand ? (
          <>
            <h3>📄 상세 정보</h3>
            {editMode ? (
              <>
                <label>농지 이름</label>
                <input
                  className="MyRegisteredLand-Input"
                  value={editForm.name}
                  onChange={(e) => handleEditChange("name", e.target.value)}
                />
                <label>위치</label>
                <input
                  className="MyRegisteredLand-Input"
                  value={editForm.location}
                  onChange={(e) => handleEditChange("location", e.target.value)}
                />
                <label>작물</label>
                <input
                  className="MyRegisteredLand-Input"
                  value={editForm.crop}
                  onChange={(e) => handleEditChange("crop", e.target.value)}
                />
                <label>면적(㎡)</label>
                <input
                  className="MyRegisteredLand-Input"
                  type="number"
                  value={editForm.area}
                  onChange={(e) => handleEditChange("area", e.target.value)}
                />
                <label>상태</label>
                <input
                  className="MyRegisteredLand-Input"
                  value={editForm.status}
                  onChange={(e) => handleEditChange("status", e.target.value)}
                />

                <div className="MyRegisteredLand-ButtonGroup">
                  <div className="MyRegisteredLand-Button" onClick={handleEditSave}>
                    💾 저장
                  </div>
                  <div
                    className="MyRegisteredLand-Button gray"
                    onClick={() => setEditMode(false)}
                  >
                    ❌ 취소
                  </div>
                </div>
              </>
            ) : (
              <>
                <p>농지 이름: {selectedLand.name}</p>
                <p>위치: {selectedLand.location}</p>
                <p>작물: {selectedLand.crop}</p>
                <p>면적: {selectedLand.area}㎡</p>
                <p>상태: {selectedLand.status}</p>

                <div className="MyRegisteredLand-ButtonGroup">
                  <div
                    className="MyRegisteredLand-Button"
                    onClick={() => handleEditStart(selectedLand)}
                  >
                    ✏️ 수정
                  </div>
                  <div
                    className="MyRegisteredLand-Button danger"
                    onClick={() => handleDelete(selectedLand.id)}
                  >
                    🗑 삭제
                  </div>
                  <div
                    className="MyRegisteredLand-Button gray"
                    onClick={() => setSelectedLand(null)}
                  >
                    닫기
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <p className="MyRegisteredLand-EmptyDetail">농지를 선택해주세요.</p>
        )}
      </aside>
    </div>
  );
}

export default MyRegisteredLand;
