// FarmlandDetailPanel.jsx
import "./FarmlandDetailPanel.css";

function FarmlandDetailPanel({ data, onClose }) {
  return (
    <div className="FarmlandDetailPanel-Container">
      <button className="FarmlandDetailPanel-CloseButton" onClick={onClose}>
        ✕
      </button>

      <h2>농지 상세 정보</h2>

      {/* 기본 정보 */}
      {data?.landInfo && (
        <section>
          <h3>📍 기본 정보</h3>
          <p>작물: {data.landInfo.crop}</p>
          <p>면적: {data.landInfo.areaHectare}</p>
          <p>위치: {data.landInfo.location}</p>
          <p>지번: {data.landInfo.landNumber}</p>
          <p>토양: {data.landInfo.soilType}</p>
          <p>수자원: {data.landInfo.waterSource}</p>
          <p>소유자: {data.landInfo.owner}</p>
        </section>
      )}

      {/* AI 수익 예측 */}
      {data?.aiProfit && (
        <section>
          <h3>🤖 AI 기반 수익 예측</h3>
          <p>연간 수익: {data.aiProfit.yearlyProfit}</p>
          <p>수확량: {data.aiProfit.yield}</p>
          <p>단가: {data.aiProfit.unitPrice}</p>
          <p>비용 - 자재: {data.aiProfit.cost.material}</p>
          <p>비용 - 인건비: {data.aiProfit.cost.labor}</p>
          <p>비용 - 기계: {data.aiProfit.cost.machine}</p>
          <p>예상 순이익: {data.aiProfit.netProfit}</p>
        </section>
      )}

      {/* 신뢰 매칭 */}
      {data?.trustMatch && (
        <section>
          <h3>🤝 신뢰 매칭 현황</h3>
          <p>상태: {data.trustMatch.status}</p>
          <p>대기 중 청년 수: {data.trustMatch.waitingYouth}</p>
          <p>희망 조건:</p>
          <ul>
            {data.trustMatch.preferences.map((pref, idx) => (
              <li key={idx}>ㆍ{pref}</li>
            ))}
          </ul>
        </section>
      )}

      {/* 판매자 멘트 */}
      <section>
        <h3>👵 판매자 멘트</h3>
        <blockquote>
          "{data?.sellerComment || "판매자 멘트가 없습니다."}"
        </blockquote>
      </section>
    </div>
  );
}

export default FarmlandDetailPanel;
