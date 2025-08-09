import React, { useEffect, useMemo } from "react";
import "./FarmlandDetailView.css";

export default function FarmlandDetailView({ farm, onClose }) {
  // 1) 훅은 항상 최상단에서 호출
  useEffect(() => {
    if (!farm) return;
    const onEsc = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [farm, onClose]);

  // 2) farm이 없어도 안전하게 기본값 만든 다음 useMemo 호출
  const landInfo   = farm?.detail?.landInfo ?? {};
  const aiProfit   = farm?.detail?.aiProfit ?? {};
  const trustMatch = farm?.detail?.trustMatch ?? {};
  const buildInfo  = farm?.detail?.BulidInfo ?? {};
  const accessable = farm?.detail?.Accessable ?? {};
  const tradeWork  = farm?.detail?.TradeWork ?? {};
  const otherInfo  = farm?.detail?.otherInfo ?? {};

  const buildList = useMemo(() => {
    return [buildInfo.Facility, buildInfo.Water, buildInfo.Elec, buildInfo.Mashine, buildInfo.Store]
      .filter(Boolean);
  }, [buildInfo]);

  const accessList = useMemo(() => {
    return [accessable.Access, accessable.Road, accessable.WellRoad, accessable.Bus, accessable.Car]
      .filter(Boolean);
  }, [accessable]);

  // 3) 훅 선언이 모두 끝난 뒤에 early return
  if (!farm) return null;

  const cost = aiProfit.cost || {};
  const InfoRow = ({ label, value }) => (
    <div className="FDV-info-row">
      <div className="FDV-info-label">{label}</div>
      <div className="FDV-info-value">{value ?? "-"}</div>
    </div>
  );
  const InfoList = ({ label, items }) => (
    <div className="FDV-info-block">
      <div className="FDV-info-label">{label}</div>
      <ul className="FDV-list">
        {(items && items.length ? items : ["-"]).map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="FarmlandDetailView-container" aria-readonly>
      <div className="FarmlandDetailView-topbar">
        <button className="FDV-back" onClick={onClose}>← 목록으로</button>
        <div className="FDV-title">
          {farm.emoji} {farm.name}<span className="FDV-sub"> ({farm.address})</span>
        </div>
        <button className="FDV-close" onClick={onClose}>닫기 ✕</button>
      </div>

      <div className="FarmlandDetailView-grid">
        <section className="FarmlandDetailView-section">
          <h3>기본 정보</h3>
          <InfoRow label="소유자" value={landInfo.owner} />
          <InfoRow label="거주지" value={landInfo.Home} />
          <InfoRow label="등록일" value={landInfo.Resister} />
          <h4>농지 위치</h4>
          <InfoRow label="주소" value={farm.address} />
          <InfoRow label="지번" value={landInfo.landNumber} />
          <InfoRow label="도로명" value={landInfo.RoadAdderss} />
          <InfoRow label="정확 위치" value={landInfo.location} />
          <h4>면적/토양</h4>
          <InfoRow label="총 면적(㎡)" value={farm.area} />
          <InfoRow label="면적(ha)" value={landInfo.areaHectare} />
          <InfoRow label="토양 형태" value={landInfo.soilType} />
          <InfoRow label="토질" value={landInfo.SandQual} />
          <InfoRow label="수원" value={landInfo.waterSource} />
        </section>

        <section className="FarmlandDetailView-section">
          <h3>재배 정보</h3>
          <InfoRow label="직전 재배 이력" value={landInfo.crop || farm.crop} />
          <h4>기반 시설</h4>
          <InfoList label="항목" items={buildList} />
          <h4>접근성</h4>
          <InfoList label="항목" items={accessList} />
          <h4>매칭 현황</h4>
          <InfoRow label="상태" value={trustMatch.status} />
          <InfoList label="우대 조건" items={trustMatch.preferences} />
          <InfoRow label="대기 중 청년 수" value={trustMatch.waitingYouth} />
          <h4>사연/에피소드</h4>
          <div className="FDV-note">{farm.Memory || "-"}</div>
        </section>

        <section className="FarmlandDetailView-section">
          <h3>희망 조건 (거래)</h3>
          <InfoRow label="구분" value={tradeWork.Trade} />
          <InfoRow label="유형" value={tradeWork.Type} />
          <InfoRow label="우선 매칭" value={tradeWork.MAtch} />
          <InfoRow label="희망 금액" value={tradeWork.Price} />
          <InfoRow label="희망 시기" value={tradeWork.When} />
          <h4>AI 예상 수익</h4>
          <InfoRow label="연 예상 수익" value={aiProfit.yearlyProfit} />
          <InfoRow label="예상 생산량" value={aiProfit.yield} />
          <InfoRow label="평균 단가" value={aiProfit.unitPrice} />
          <div className="FDV-info-block">
            <div className="FDV-info-label">비용(연)</div>
            <ul className="FDV-list">
              <li>자재: {cost.material ?? "-"}</li>
              <li>인건비: {cost.labor ?? "-"}</li>
              <li>기계: {cost.machine ?? "-"}</li>
            </ul>
          </div>
          <InfoRow label="순이익(±오차)" value={aiProfit.netProfit} />
          <h4>기타 첨부 서류</h4>
          <InfoRow label="등록 사유" value={otherInfo.Why} />
          <InfoRow label="등기부등본" value={otherInfo.Update1} />
          <InfoRow label="토지대장" value={otherInfo.Update2} />
          <InfoRow label="농지원부/경영체" value={otherInfo.Update3} />
          <h4>판매자 멘트</h4>
          <div className="FDV-note">{farm.detail?.sellerComment || "-"}</div>
          <div className="FarmlandDetailView-actions">
            <button className="FarmlandDetailView-close-btn" onClick={onClose}>닫기</button>
          </div>
        </section>
      </div>
    </div>
  );
}
