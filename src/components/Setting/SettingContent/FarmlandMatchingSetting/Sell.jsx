import React, { useEffect, useState } from "react";
import "./Sell.css";
import { getFarmlandData } from "../../../../api/farmland"; // 경로 확인
import FarmlandDetailView from "./FarmlandDetailView";

export default function Sell() {
  const [farmlands, setFarmlands] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFarm, setSelectedFarm] = useState(null);
  const itemsPerPage = 2;

  useEffect(() => {
    (async () => {
      const data = await getFarmlandData();
      setFarmlands(data || []);
    })();
  }, []);

  const openDetail = (farm) => {
    setSelectedFarm(farm);
    const el = document.querySelector(".SettingModal-SettingsDetailArea");
    if (el) el.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (selectedFarm) {
    return (
      <FarmlandDetailView
        farm={selectedFarm}
        onClose={() => setSelectedFarm(null)}
      />
    );
  }

  const totalPages = Math.max(1, Math.ceil(farmlands.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentFarmlands = farmlands.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);

  return (
    <div className="Sell-container">
      <div className="Sell-wrapper">
        {currentFarmlands.map((farm) => {
          const status = farm.detail?.trustMatch?.status || "알 수 없음";
          const canChat = status === "매칭 성공";

          return (
            <div key={farm.id} className="Sell-card">
              <img
                src={`/images/farm${(farm.id % 5) + 1}.jpg`}
                alt="farm"
                className="Sell-farm-image"
              />

              <div className="Sell-info-row wide">
                <label>주소</label>
                <span>{farm.address}</span>
              </div>

              <div className="Sell-info-row horizontal">
                <div>
                  <label>작물</label>
                  <span>{farm.crop}</span>
                </div>
                <div>
                  <label>등록일</label>
                  <span>{farm.detail?.landInfo?.Resister || farm.Resister || "미상"}</span>
                </div>
              </div>

              <div className="Sell-info-row horizontal">
                <div>
                  <label>매칭 상태</label>
                  <span>{status}</span>
                </div>
                <div>
                  <label>예상 수익</label>
                  <span>{farm.detail?.aiProfit?.netProfit || "계산 중"}</span>
                </div>
              </div>

              <div className="Sell-btn-group">
                <button className="Sell-btn detail" onClick={() => openDetail(farm)}>
                  상세 보기
                </button>

                {/* ✅ 수락 → 채팅. 매칭 성공일 때만 활성화 */}
                <button
                  className={`Sell-btn chat ${canChat ? "on" : "off"}`}
                  disabled={!canChat}
                  aria-disabled={!canChat}
                  onClick={() => {
                    if (!canChat) return;
                    // TODO: 실제 채팅 열기 로직 연결
                    alert(`[채팅] ${farm.name} 과(와) 채팅을 시작합니다.`);
                  }}
                >
                  채팅
                </button>

                <button
                className="Sell-btn reject"
                onClick={() => {
                  if (window.confirm("정말 삭제하시겠습니까?")) {
                  setFarmlands((prev) => prev.filter((f) => f.id !== farm.id));
                    }
                  }} >
                삭제
              </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="Sell-controls">
        <button onClick={handlePrev} disabled={currentPage === 1}>
          &lt;
        </button>
        <span>{` ${currentPage} / ${totalPages} `}</span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          &gt;
        </button>
      </div>
    </div>
  );
}
