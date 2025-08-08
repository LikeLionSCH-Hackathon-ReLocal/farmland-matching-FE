// Sell.jsx
import React, { useEffect, useState } from "react";
import "./Sell.css";
import { getFarmlandData } from "../../../../api/farmland"; // 경로 확인
import FarmlandDetailView from "./FarmlandDetailView"; // ✅ 추가

const Sell = () => {
  const [farmlands, setFarmlands] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFarm, setSelectedFarm] = useState(null); // ✅ 추가
  const itemsPerPage = 2;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFarmlandData();
      setFarmlands(data);
    };
    fetchData();
  }, []);

  // ✅ 상세보기 토글 (Purchase 패턴과 동일)
  if (selectedFarm) {
    return (
      <FarmlandDetailView
        farm={selectedFarm}
        onClose={() => setSelectedFarm(null)}
      />
    );
  }

  const totalPages = Math.ceil(farmlands.length / itemsPerPage);
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
        {currentFarmlands.map((farm) => (
          <div key={farm.id} className="Sell-card">
            <img
              src={`/images/farm${(farm.id % 5) + 1}.jpg`}
              alt="farm"
              className="Sell-farm-image"
            />
            {/* 기존 input → span 기반으로 출력 구조 변경 */}
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
                <span>
                  {farm.detail?.landInfo?.Resister || farm.Resister || "미상"}
                </span>
              </div>
            </div>
            <div className="Sell-info-row horizontal">
              <div>
                <label>매칭 상태</label>
                <span>{farm.detail?.trustMatch?.status || "알 수 없음"}</span>
              </div>
              <div>
                <label>예상 수익</label>
                <span>{farm.detail?.aiProfit?.netProfit || "계산 중"}</span>
              </div>
            </div>

            <div className="Sell-btn-group">
              {/* ✅ 상세 보기 클릭 시 선택 설정 */}
              <button
                className="Sell-btn detail"
                onClick={() => setSelectedFarm(farm)}
              >
                상세 보기
              </button>
              <button className="Sell-btn match">수락</button>
              <button className="Sell-btn reject">삭제</button>
            </div>
          </div>
        ))}
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
};

export default Sell;
