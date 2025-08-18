// src/components/Pannel/FarmlandDetailPanel.jsx
import { useRef, useEffect } from "react";
import "./FarmlandDetailPanel.css";

function Labeled({ label, children }) {
  return (
    <div className="FDP-field">
      <div className="FDP-label">{label}</div>
      <div className="FDP-value">{children ?? "-"}</div>
    </div>
  );
}

function formatArea(area) {
  if (area == null || isNaN(area)) return "-";
  const ha = (area / 10000).toFixed(2);
  return `${Number(area).toLocaleString()} ㎡ (${ha} ha)`;
}

function formatCoord(x) {
  if (x == null || isNaN(x)) return "-";
  return String(Number(x).toFixed(6));
}

function FarmlandDetailPanel({ data, onClose }) {
  const dragRef = useRef(null);
  const pos = useRef({ x: 0, y: 0, dx: 0, dy: 0 });

  // 드래그 이동 유지
  useEffect(() => {
    const el = dragRef.current;
    if (!el) return;

    const onMouseDown = (e) => {
      pos.current = { ...pos.current, x: e.clientX, y: e.clientY, dx: el.offsetLeft, dy: el.offsetTop };
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

  // 👉 RightPanel에서 넘겨준 매핑 구조와 BE 원시 필드 모두 대응
  const landInfo = data?.landInfo || {};
  const facilities = data?.facilities || {};
  const access = data?.access || {};
  const trade = data?.trade || {};

  // 백엔드 원시 키 (있으면 우선 사용)
  const be = {
    landId: data?.landId ?? landInfo.landId,
    landName: data?.landName ?? data?.name,
    landAddress: data?.landAddress,
    landRoadAddress: data?.landRoadAddress ?? landInfo.location,
    landNumber: data?.landNumber ?? landInfo.landNumber,
    landLat: data?.landLat ?? landInfo.lat,
    landLng: data?.landLng ?? landInfo.lng,
    landCrop: data?.landCrop ?? landInfo.crop,
    landArea: data?.landArea,
    soiltype: data?.soiltype ?? landInfo.soilType,
    waterSource: data?.waterSource ?? landInfo.waterSource,
    ownerName: data?.ownerName,
    ownerAge: data?.ownerAge,
    ownerAddress: data?.ownerAddress,
    landWater: data?.landWater ?? facilities.water,
    landElec: data?.landElec ?? facilities.elec,
    landMachine: data?.landMachine ?? facilities.machine,
    landStorage: data?.landStorage ?? facilities.storage,
    landHouse: data?.landHouse ?? facilities.house,
    landFence: data?.landFence ?? facilities.fence,
    landRoad: data?.landRoad ?? access.road,
    landWellRoad: data?.landWellRoad ?? access.wellRoad,
    landBus: data?.landBus ?? access.bus,
    landCar: data?.landCar ?? access.car,
    landTrade: data?.landTrade ?? trade.type,
    landMatch: data?.landMatch ?? trade.match,
    landPrice: data?.landPrice ?? trade.price,
    landWhen: data?.landWhen ?? trade.when,
    landWhy: data?.landWhy ?? trade.why,
    landComent: data?.landComent ?? data?.sellerComment,
    landImage: data?.landImage ?? data?.image,
  };

  return (
    <div className="FarmlandDetailPanel-Overlay">
      <div className="FarmlandDetailPanel-Container FDP" ref={dragRef}>
        {/* 헤더 */}
        <div className="FarmlandDetailPanel-Header">
          <h2>농지 상세 정보</h2>
          <div className="FarmlandDetailPanel-Buttons">
            <button className="FarmlandDetailPanel-Button">⭐ 즐겨찾기</button>
            <button className="FarmlandDetailPanel-Button">📃 신청하기</button>
            <button className="FarmlandDetailPanel-CloseButton" onClick={onClose}>✕</button>
          </div>
        </div>

        {/* 이미지 */}
        {be.landImage && (
          <div className="FDP-imageWrap">
            {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
            <img src={be.landImage} alt="land image" className="FDP-image" />
          </div>
        )}

        {/* 기본/위치 */}
        <section className="FarmlandDetailPanel-Section">
          <h3>📍 기본 정보</h3>
          <div className="FDP-grid">
            <Labeled label="농지명">{be.landName}</Labeled>
            <Labeled label="도로명 주소">{be.landRoadAddress}</Labeled>
            <Labeled label="지번 주소">{be.landAddress}</Labeled>
            <Labeled label="지번">{be.landNumber}</Labeled>
            <Labeled label="작물">{be.landCrop}</Labeled>
            <Labeled label="면적">{be.landArea != null ? formatArea(be.landArea) : landInfo.areaHectare}</Labeled>
            <Labeled label="토양">{be.soiltype}</Labeled>
            <Labeled label="수자원">{be.waterSource}</Labeled>
            <Labeled label="위도">{formatCoord(be.landLat)}</Labeled>
            <Labeled label="경도">{formatCoord(be.landLng)}</Labeled>
          </div>
        </section>

        {/* 소유자 */}
        <section className="FarmlandDetailPanel-Section">
          <h3>👩‍🌾 소유자 정보</h3>
          <div className="FDP-grid">
            <Labeled label="성명">{be.ownerName}</Labeled>
            <Labeled label="나이">{be.ownerAge}</Labeled>
            <Labeled label="주소">{be.ownerAddress}</Labeled>
            {/* landInfo.owner(이름(나이))가 있으면 보조로 표기 */}
            {landInfo.owner && <Labeled label="표시명">{landInfo.owner}</Labeled>}
          </div>
        </section>

        {/* 설비 */}
        <section className="FarmlandDetailPanel-Section">
          <h3>🧰 설비</h3>
          <div className="FDP-grid">
            <Labeled label="용수">{be.landWater}</Labeled>
            <Labeled label="전기">{be.landElec}</Labeled>
            <Labeled label="농기계">{be.landMachine}</Labeled>
            <Labeled label="창고">{be.landStorage}</Labeled>
            <Labeled label="주택">{be.landHouse}</Labeled>
            <Labeled label="울타리">{be.landFence}</Labeled>
          </div>
        </section>

        {/* 접근성 */}
        <section className="FarmlandDetailPanel-Section">
          <h3>🛣 접근성</h3>
          <div className="FDP-grid">
            <Labeled label="도로 접함">{be.landRoad}</Labeled>
            <Labeled label="진입로 상태">{be.landWellRoad}</Labeled>
            <Labeled label="대중교통">{be.landBus}</Labeled>
            <Labeled label="차량 접근">{be.landCar}</Labeled>
          </div>
        </section>

        {/* 거래 */}
        <section className="FarmlandDetailPanel-Section">
          <h3>💼 거래 정보</h3>
          <div className="FDP-grid">
            <Labeled label="거래 형태">{be.landTrade}</Labeled>
            <Labeled label="매칭 상태">{be.landMatch}</Labeled>
            <Labeled label="가격">{be.landPrice != null ? `${be.landPrice.toLocaleString()} 원` : "-"}</Labeled>
            <Labeled label="가능 시기">{be.landWhen}</Labeled>
            <Labeled label="양도/거래 사유">{be.landWhy}</Labeled>
          </div>
        </section>

        {/* 판매자 멘트 */}
        <section className="FarmlandDetailPanel-Section">
          <h3>👵 판매자 멘트</h3>
          <blockquote className="FDP-quote">
            "{be.landComent || data?.sellerComment || "판매자 멘트가 없습니다."}"
          </blockquote>
        </section>

        {/* (선택) AI/신뢰 섹션도 그대로 유지 노출 */}
        {data?.aiProfit && (
          <section className="FarmlandDetailPanel-Section">
            <h3>🤖 AI 기반 수익 예측</h3>
            <div className="FDP-grid">
              <Labeled label="연간 수익">{data.aiProfit.yearlyProfit}</Labeled>
              <Labeled label="수확량">{data.aiProfit.yield}</Labeled>
              <Labeled label="단가">{data.aiProfit.unitPrice}</Labeled>
              <Labeled label="비용-자재">{data.aiProfit.cost.material}</Labeled>
              <Labeled label="비용-인건비">{data.aiProfit.cost.labor}</Labeled>
              <Labeled label="비용-기계">{data.aiProfit.cost.machine}</Labeled>
              <Labeled label="예상 순이익">{data.aiProfit.netProfit}</Labeled>
            </div>
          </section>
        )}

        {data?.trustMatch && (
          <section className="FarmlandDetailPanel-Section">
            <h3>🤝 신뢰 매칭 현황</h3>
            <div className="FDP-grid">
              <Labeled label="상태">{data.trustMatch.status}</Labeled>
              <Labeled label="대기 중 청년">{data.trustMatch.waitingYouth}명</Labeled>
              <div className="FDP-col-span-2">
                <div className="FDP-label">희망 조건</div>
                <ul className="FDP-list">
                  {data.trustMatch.preferences.map((p, i) => (
                    <li key={i}>ㆍ{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default FarmlandDetailPanel;
