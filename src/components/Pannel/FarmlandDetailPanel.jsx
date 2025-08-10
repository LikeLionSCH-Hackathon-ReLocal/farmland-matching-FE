import { useRef, useEffect } from "react";
import "./FarmlandDetailPanel.css";

function FarmlandDetailPanel({ data, onClose }) {
  const dragRef = useRef(null);
  const pos = useRef({ x: 0, y: 0, dx: 0, dy: 0 });

  useEffect(() => {
    const el = dragRef.current;
    if (!el) return;

    const onMouseDown = (e) => {
      pos.current = {
        ...pos.current,
        x: e.clientX,
        y: e.clientY,
        dx: el.offsetLeft,
        dy: el.offsetTop,
      };
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    };

    const onMouseMove = (e) => {
      const moveX = e.clientX - pos.current.x;
      const moveY = e.clientY - pos.current.y;
      el.style.left = `${pos.current.dx + moveX}px`;
      el.style.top = `${pos.current.dy + moveY}px`;
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    el.addEventListener("mousedown", onMouseDown);
    return () => el.removeEventListener("mousedown", onMouseDown);
  }, []);

  return (
    <div className="FarmlandDetailPanel-Overlay">
      <div className="FarmlandDetailPanel-Container" ref={dragRef}>
        <div className="FarmlandDetailPanel-Header">
          <h2>농지 상세 정보</h2>
          <div className="FarmlandDetailPanel-Buttons">
            <button className="FarmlandDetailPanel-Button">⭐ 즐겨찾기</button>
            <button className="FarmlandDetailPanel-Button">📃 신청하기</button>
            <button className="FarmlandDetailPanel-CloseButton" onClick={onClose}>✕</button>
          </div>
        </div>

        <div className="FarmlandDetailPanel-Content">
          {/* 기본 정보 */}
          {data?.landInfo && (
            <section className="FarmlandDetailPanel-Section">
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
            <section className="FarmlandDetailPanel-Section">
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
            <section className="FarmlandDetailPanel-Section">
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
          <section className="FarmlandDetailPanel-Section">
            <h3>👵 판매자 멘트</h3>
            <blockquote>
              "{data?.sellerComment || "판매자 멘트가 없습니다."}"
            </blockquote>
          </section>
        </div>
      </div>
    </div>
  );
}

export default FarmlandDetailPanel;
