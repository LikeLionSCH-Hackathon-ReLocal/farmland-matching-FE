// Sell.jsx
import React, { useEffect, useState } from "react";
import "./Sell.css";
import { getFarmlandData } from "../../../../api/farmland"; // 경로 확인
import FarmlandDetailView from "./FarmlandDetailView"; // ✅ 추가

const Sell = () => {
  const [farmlands, setFarmlands] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFarm, setSelectedFarm] = useState(null); // ✅ 추가
  const itemsPerPage = 3;

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
  const currentFarmlands = farmlands.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  return (
    <div className="Sell-container">
      <div className="Sell-wrapper">
        {currentFarmlands.map((farm) => (
          <div key={farm.id} className="Sell-card">
            <img
              src={`/images/farm${(farm.id % 5) + 1}.jpg`}
              alt="farm"
              className="farm-image"
            />
            <div className="info-row">
              <label>주소</label>
              <input type="text" value={farm.address} readOnly />
            </div>
            <div className="info-row">
              <label>작물</label>
              <input type="text" value={farm.crop} readOnly />
            </div>
            <div className="info-row">
              <label>등록일</label>
              <input
                type="text"
                value={farm.detail?.landInfo?.Resister || farm.Resister || "미상"}
                readOnly
              />
            </div>
            <div className="info-row">
              <label>매칭 상태</label>
              <input
                type="text"
                value={farm.detail?.trustMatch?.status || "알 수 없음"}
                readOnly
              />
            </div>
            <div className="info-row">
              <label>예상 수익</label>
              <input
                type="text"
                value={farm.detail?.aiProfit?.netProfit || "계산 중"}
                readOnly
              />
            </div>
            <div className="btn-group">
              {/* ✅ 상세 보기 클릭 시 선택 설정 */}
              <button className="btn detail" onClick={() => setSelectedFarm(farm)}>
                상세 보기
              </button>
              <button className="btn match">수락</button>
              <button className="btn reject">삭제</button>
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
