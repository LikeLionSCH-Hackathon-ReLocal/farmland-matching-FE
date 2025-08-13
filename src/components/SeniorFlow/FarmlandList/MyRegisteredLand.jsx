import { useState, useEffect } from "react";
import "./MyRegisteredLand.css";
import FloatingEmojis from "../../../pages/Effect/FloatingEmojis";
import { useNavigate } from "react-router-dom";
import { getMatchingPersonData } from "../../../api/Perchaser"; // 경로 조정

const initialDummyLands = [
  { id: 1, name: "아산 🥔 농지 1", location: "충남 아산시 도고면", crop: "감자", area: 800, status: "매칭 대기" },
  { id: 2, name: "아산 🍅 농지 2", location: "충남 아산시 배방읍", crop: "토마토", area: 1200, status: "매칭 중" },
];

function MyRegisteredLand({sellerId = 1}) {
  const navigate = useNavigate();

  const [lands, setLands] = useState(initialDummyLands);
  const [selectedLand, setSelectedLand] = useState(null);

  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState(null);

  // 신규: 신청자 상태
  const [applicants, setApplicants] = useState([]);            // 목록
  const [selectedApplicant, setSelectedApplicant] = useState(null); // 선택된 신청자

  // // ✅ 컴포넌트 로드 시 DB에서 농지 목록 가져오기
  // useEffect(() => {
  //   fetch(`http://localhost:8080/${sellerId}/farmland`)
  //     .then((res) => {
  //       if (!res.ok) throw new Error("서버 응답 오류");
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setLands(data);
  //     })
  //     .catch((err) => {
  //       console.error("농지 데이터 불러오기 실패:", err);
  //     });
  // }, [sellerId]);

  // 상세 보기 클릭 시 해당 농지 선택 + 신청자 로딩
  const openDetail = async (land) => {
    setSelectedLand(land);
    setEditMode(false);
    setSelectedApplicant(null);
    const data = await getMatchingPersonData();
    // 기본 상태: 대기
    setApplicants(data.map((d) => ({ ...d, status: "대기" })));
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmed) return;
    setLands((prev) => prev.filter((land) => land.id !== id));
    setSelectedLand((prev) => (prev?.id === id ? null : prev));
    setEditMode(false);
    setApplicants([]);
    setSelectedApplicant(null);
  };

  const handleEditStart = (land) => {
    setEditMode(true);
    setEditForm({ ...land });
  };

  const handleEditChange = (key, value) => {
    setEditForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleEditSave = () => {
    if (!editForm) return;
    const next = {
      ...editForm,
      area: editForm.area === "" || editForm.area === null ? 0 : Number(editForm.area),
    };
    setLands((prev) => prev.map((land) => (land.id === next.id ? next : land)));
    setSelectedLand(next);
    setEditMode(false);
  };

  // 신청자 수락/거부
  const handleAccept = (id) => {
    setApplicants((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "수락" } : a))
    );
    // 선택 카드도 즉시 반영
    if (selectedApplicant?.id === id) {
      setSelectedApplicant({ ...selectedApplicant, status: "수락" });
    }
    // 원하면 첫 수락 시 해당 농지 상태를 "매칭 중"으로 변경
    // if (selectedLand && selectedLand.status !== "매칭 중") {
    //   const updatedLand = { ...selectedLand, status: "매칭 중" };
    //   setLands((prev) => prev.map((l) => (l.id === updatedLand.id ? updatedLand : l)));
    //   setSelectedLand(updatedLand);
    // }
  };

  const handleReject = (id) => {
    setApplicants((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "거부" } : a))
    );
    if (selectedApplicant?.id === id) {
      setSelectedApplicant({ ...selectedApplicant, status: "거부" });
    }
  };

  // 방어: editMode인데 editForm이 없으면 selectedLand로 초기화
  useEffect(() => {
    if (editMode && !editForm && selectedLand) {
      setEditForm({ ...selectedLand });
    }
  }, [editMode, editForm, selectedLand]);

  return (
    <div className="MyRegisteredLand-Wrapper">
      <FloatingEmojis />

      <button
        className="SeniorProfile-BackButton"
        onClick={() => navigate("/SeniorMain")}
        type="button"
      >
        ⬅ 홈으로
      </button>

      {/* 좌측: 내 농지 목록 */}
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
              <div className="MyRegisteredLand-LandStatus">상태: {land.status}</div>
              <div className="MyRegisteredLand-ButtonGroup">
                <div className="MyRegisteredLand-Button" onClick={() => openDetail(land)}>
                  자세히 보기
                </div>
                <div className="MyRegisteredLand-Button danger" onClick={() => handleDelete(land.id)}>
                  삭제
                </div>
              </div>
            </div>
          ))
        )}
      </section>

      {/* 우측: 상세 + 신청자 */}
      <aside className="MyRegisteredLand-DetailPanel">
        {selectedLand ? (
          <>
            <h3>📄 상세 정보</h3>

            {editMode ? (
              <>
                <label>농지 이름</label>
                <input
                  className="MyRegisteredLand-Input"
                  value={editForm?.name ?? ""}
                  onChange={(e) => handleEditChange("name", e.target.value)}
                />

                <label>위치</label>
                <input
                  className="MyRegisteredLand-Input"
                  value={editForm?.location ?? ""}
                  onChange={(e) => handleEditChange("location", e.target.value)}
                />

                <label>작물</label>
                <input
                  className="MyRegisteredLand-Input"
                  value={editForm?.crop ?? ""}
                  onChange={(e) => handleEditChange("crop", e.target.value)}
                />

                <label>면적(㎡)</label>
                <input
                  className="MyRegisteredLand-Input"
                  type="number"
                  value={editForm?.area ?? 0}
                  onChange={(e) => handleEditChange("area", e.target.value)}
                />

                <label>상태</label>
                <input
                  className="MyRegisteredLand-Input"
                  value={editForm?.status ?? ""}
                  onChange={(e) => handleEditChange("status", e.target.value)}
                />

                <div className="MyRegisteredLand-ButtonGroup">
                  <div className="MyRegisteredLand-Button" onClick={handleEditSave}>
                    💾 저장
                  </div>
                  <div className="MyRegisteredLand-Button gray" onClick={() => setEditMode(false)}>
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
                  <div className="MyRegisteredLand-Button" onClick={() => handleEditStart(selectedLand)}>
                    ✏️ 수정
                  </div>
                  <div className="MyRegisteredLand-Button danger" onClick={() => handleDelete(selectedLand.id)}>
                    🗑 삭제
                  </div>
                  <div className="MyRegisteredLand-Button gray" onClick={() => setSelectedLand(null)}>
                    닫기
                  </div>
                </div>
              </>
            )}

            {/* --- 신청자 영역 --- */}
            <div className="MyRegisteredLand-Applicants">
              <h4>👥 신청자 목록</h4>
              {applicants.length === 0 ? (
                <p className="MyRegisteredLand-EmptyApplicants">신청자가 없습니다.</p>
              ) : (
                <div className="MyRegisteredLand-ApplicantsLayout">
                  <div className="MyRegisteredLand-ApplicantsList">
                    {applicants.map((a) => (
                      <div
                        key={a.id}
                        className={`ApplicantItem ${selectedApplicant?.id === a.id ? "active" : ""}`}
                        onClick={() => setSelectedApplicant(a)}
                      >
                        <div className="ApplicantNameRow">
                          <span className="ApplicantName">{a.name}</span>
                          <span className={`ApplicantBadge ${a.status}`}>
                            {a.status}
                          </span>
                        </div>
                        <div className="ApplicantMeta">
                          {a.age}세 · {a.sex} · {a.address}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="MyRegisteredLand-ApplicantDetail">
                    {selectedApplicant ? (
                      <>
                        <div className="ApplicantDetail-Header">
                          <div className="ApplicantDetail-Name">{selectedApplicant.name}</div>
                          <div className={`ApplicantBadge ${selectedApplicant.status}`}>
                            {selectedApplicant.status}
                          </div>
                        </div>
                        <div className="ApplicantDetail-Body">
                          <div>📞 {selectedApplicant.callNumber}</div>
                          <div>🧾 {selectedApplicant.presentation}</div>
                          <div>🌱 {selectedApplicant.interest}</div>
                          <div>🤝 {selectedApplicant.suggest}</div>
                          <div>🎬 {selectedApplicant.video}</div>
                          <div>🧑‍🌾 {selectedApplicant.expereince}</div>
                          <div>🛠️ {selectedApplicant.skill}</div>
                          <div>💼 {selectedApplicant.want}</div>

                          {/* 자격/수료/활동 요약 */}
                          <div className="ApplicantDetail-Tags">
                            {Object.values(selectedApplicant.detail?.yellow || {}).map((t, i) => (
                              <span key={`y-${i}`} className="Tag yellow">{t}</span>
                            ))}
                            {Object.values(selectedApplicant.detail?.green || {}).map((t, i) => (
                              <span key={`g-${i}`} className="Tag green">{t}</span>
                            ))}
                            {Object.values(selectedApplicant.detail?.grey || {}).map((t, i) => (
                              <span key={`gr-${i}`} className="Tag grey">{t}</span>
                            ))}
                          </div>
                        </div>

                        <div className="MyRegisteredLand-ButtonGroup">
                          <div
                            className="MyRegisteredLand-Button accept"
                            onClick={() => handleAccept(selectedApplicant.id)}
                          >
                            ✅ 신청 수락
                          </div>
                          <div
                            className="MyRegisteredLand-Button reject"
                            onClick={() => handleReject(selectedApplicant.id)}
                          >
                            🚫 신청 거부
                          </div>
                        </div>
                      </>
                    ) : (
                      <p className="MyRegisteredLand-EmptyDetail">좌측에서 신청자를 선택하세요.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <p className="MyRegisteredLand-EmptyDetail">농지를 선택해주세요.</p>
        )}
      </aside>
    </div>
  );
}

export default MyRegisteredLand;

