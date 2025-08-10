// RightPanel.jsx
import { useState, useEffect } from "react";
import "./RightPanel.css";
import FarmlandDetailPanel from "./FarmlandDetailPanel";

function RightPanel({ selected, onClose, onApply, onToggleFavorite }) {
  const [pageIndex, setPageIndex] = useState(0);
  const [showDetail, setShowDetail] = useState(false);
  const [applied, setApplied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const maxPage = 3;

  useEffect(() => {
    setPageIndex(0);
    setShowDetail(false);
    setApplied(false);
    setIsFavorite(false);
  }, [selected]);

  if (!selected) return null;

  const handleApply = () => {
    setApplied(true);
    onApply && onApply(selected); // 선택 사항: 외부로 이벤트 전달
  };

  const handleToggleFavorite = () => {
    setIsFavorite((v) => !v);
    onToggleFavorite && onToggleFavorite(selected);
  };

  return (
    <div className="RightPanel-RightContainer">
      <div className="RightPanel-TopButtons">
        <button
          onClick={() => setShowDetail(true)}
          className="RightPanel-DetailButton"
        >
          상세 보기
        </button>

        <div className="RightPanel-ActionGroup">
          <button
            className={`RightPanel-PrimaryButton ${applied ? "is-disabled" : ""}`}
            onClick={handleApply}
            disabled={applied}
            title={applied ? "이미 신청 완료" : "이 농지에 매칭을 신청합니다"}
          >
            {applied ? "신청 완료" : "신청하기"}
          </button>

          <button
            className={`RightPanel-SecondaryButton ${isFavorite ? "active" : ""}`}
            onClick={handleToggleFavorite}
            title="즐겨찾기에 추가/제거"
          >
            {isFavorite ? "즐겨찾기 ✓" : "즐겨찾기 추가"}
          </button>
        </div>

        <button className="RightPanel-CloseButton" onClick={onClose}>
          ✕
        </button>
      </div>

      <div className="RightPanel-ImagePlaceholder">사진 자리</div>

      <div className="RightPanel-PageNav">
        {pageIndex > 0 ? (
          <button
            className="RightPanel-PageButton"
            onClick={() => setPageIndex((prev) => prev - 1)}
          >
            ⬅ 이전
          </button>
        ) : (
          <div />
        )}

        {pageIndex < maxPage ? (
          <button
            className="RightPanel-PageButton"
            onClick={() => setPageIndex((prev) => prev + 1)}
          >
            다음 ➡
          </button>
        ) : (
          <div />
        )}
      </div>

      {/* 0. 농지 기본 정보 */}
      {pageIndex === 0 && selected.detail?.landInfo && (
        <div className="RightPanel-InfoBlock">
          <h3 className="RightPanel-InfoTitle">
            {selected.emoji} {selected.name}
          </h3>
          <div className="RightPanel-InfoRow">
            <strong>📍 주소:</strong> {selected.address}
          </div>
          <div className="RightPanel-InfoRow">
            <strong>🌱 작물:</strong> {selected.detail.landInfo.crop}
          </div>
          <div className="RightPanel-InfoRow">
            <strong>📐 면적:</strong> {selected.detail.landInfo.areaHectare}
          </div>
          <div className="RightPanel-InfoRow">
            <strong>🗺 위치:</strong> {selected.detail.landInfo.location}
          </div>
          <div className="RightPanel-InfoRow">
            <strong>🏷 지번정보:</strong> {selected.detail.landInfo.landNumber}
          </div>
          <div className="RightPanel-InfoRow">
            <strong>🧪 토양 유형:</strong> {selected.detail.landInfo.soilType}
          </div>
          <div className="RightPanel-InfoRow">
            <strong>💧 수자원:</strong> {selected.detail.landInfo.waterSource}
          </div>
          <div className="RightPanel-InfoRow">
            <strong>👩‍🌾 소유자:</strong> {selected.detail.landInfo.owner}
          </div>
        </div>
      )}

      {/* 1. AI 기반 예상 수익 */}
      {pageIndex === 1 && selected.detail?.aiProfit && (
        <div className="RightPanel-InfoBlock">
          <h3 className="RightPanel-InfoTitle">🤖 AI 기반 예상 수익</h3>
          <div className="RightPanel-InfoRow">
            <strong>총 예상 수익:</strong> {selected.detail.aiProfit.yearlyProfit}
          </div>
          <div className="RightPanel-InfoRow">
            <strong>수확량:</strong> {selected.detail.aiProfit.yield}
          </div>
          <div className="RightPanel-InfoRow">
            <strong>작물 단가:</strong> {selected.detail.aiProfit.unitPrice}
          </div>
          <div className="RightPanel-InfoRow">
            <strong>비용 분석</strong>
          </div>
          <div className="RightPanel-InfoRow">
            ㆍ비료 및 자재: {selected.detail.aiProfit.cost.material}
          </div>
          <div className="RightPanel-InfoRow">
            ㆍ인건비: {selected.detail.aiProfit.cost.labor}
          </div>
          <div className="RightPanel-InfoRow">
            ㆍ기계·임차비: {selected.detail.aiProfit.cost.machine}
          </div>
          <div className="RightPanel-InfoRow">
            <strong>예상 순수익:</strong> {selected.detail.aiProfit.netProfit}
          </div>
        </div>
      )}

      {/* 2. 신뢰 매칭 현황 */}
      {pageIndex === 2 && selected.detail?.trustMatch && (
        <div className="RightPanel-InfoBlock">
          <h3 className="RightPanel-InfoTitle">🤝 신뢰 매칭 현황</h3>
          <div className="RightPanel-InfoRow">
            <strong>현재 매칭 상태:</strong> {selected.detail.trustMatch.status}
          </div>
          <div className="RightPanel-InfoRow">
            <strong>매칭 희망 조건:</strong>
          </div>
          <ul>
            {selected.detail.trustMatch.preferences.map((pref, idx) => (
              <li key={idx}>ㆍ{pref}</li>
            ))}
          </ul>
          <div className="RightPanel-InfoRow">
            <strong>추천 청년:</strong> {selected.detail.trustMatch.waitingYouth}명 대기 중
          </div>
        </div>
      )}

      {/* 3. 판매자 멘트 */}
      {pageIndex === 3 && (
        <div className="RightPanel-InfoBlock">
          <h3 className="RightPanel-InfoTitle">👵 판매자 한마디</h3>
          <blockquote style={{ fontStyle: "italic", color: "#555" }}>
            "{selected.detail?.sellerComment || "멘트가 없습니다."}"
          </blockquote>
        </div>
      )}

      {/* 중앙 상세 패널 */}
      {showDetail && (
        <div className="RightPanel-ModalOverlay">
          <FarmlandDetailPanel data={selected.detail} onClose={() => setShowDetail(false)} />
        </div>
      )}
    </div>
  );
}

export default RightPanel;
