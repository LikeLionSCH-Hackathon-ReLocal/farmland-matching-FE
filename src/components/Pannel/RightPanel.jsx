// src/components/Pannel/RightPanel.jsx
import { useState, useEffect } from "react";
import "./RightPanel.css";
import FarmlandDetailPanel from "./FarmlandDetailPanel";

// NOTE: 파일명이 applications.js 인 경우가 많아 오탈자 수정
import { getApplicants } from "../../api/applicantOne";
import { applyForFarmland } from "../../api/applications";
import { computeMatching } from "../../utils/matching";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8080";

function RightPanel({ selected, onClose, onApply, onToggleFavorite }) {
  const [pageIndex, setPageIndex] = useState(0);
  const [showDetail, setShowDetail] = useState(false);

  // ✅ 신청 상태/로딩 상태
  const [applied, setApplied] = useState(false);
  const [applying, setApplying] = useState(false);

  const [isFavorite, setIsFavorite] = useState(false);
  const [applicant, setApplicant] = useState(null);
  const [match, setMatch] = useState(null);

  // ✅ BE 상세 데이터 상태
  const [detail, setDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState(null);

  const maxPage = 4;

  // landId 추출(백엔드 DTO에 맞게 id/landId 양쪽 대비)
  const landId =
    selected?.id ??
    selected?.landId ??
    selected?.raw?.landId ??
    selected?.detail?.landInfo?.landId;

  // ▶ 지원자/매칭 계산(기존 로직 유지)
  useEffect(() => {
    setPageIndex(0);
    setShowDetail(false);
    setApplied(false);
    setIsFavorite(false);

    (async () => {
      try {
        const list = await getApplicants();
        const picked = list.find((a) => a.id === 77) || list[0];
        setApplicant(picked || null);

        if (selected && picked) {
          const res = computeMatching(selected, picked);
          setMatch(res);
        } else {
          setMatch(null);
        }
      } catch (e) {
        console.error("[RightPanel] getApplicants/computeMatching error:", e);
      }
    })();
  }, [selected]);

  // ▶ 백엔드 상세 조회 → detail(뷰 모델) 구성
  useEffect(() => {
    if (!landId) {
      setDetail(null);
      return;
    }
    let aborted = false;

    (async () => {
      setDetailLoading(true);
      setDetailError(null);
      try {
        const res = await fetch(
          `${API_BASE}/farmland-detail/${encodeURIComponent(landId)}`,
          { method: "GET", headers: { Accept: "application/json" } }
        );
        if (!res.ok) throw new Error(`GET /farmland-detail/${landId} -> ${res.status}`);

        const data = await res.json();
        if (aborted) return;

        // 면적 표기(예: 1200 ㎡ + 0.12 ha)
        const areaSqm = typeof data.landArea === "number" ? data.landArea : null;
        const areaHa = areaSqm != null ? (areaSqm / 10000).toFixed(2) : null;
        const areaHectareStr =
          areaSqm != null ? `${areaSqm.toLocaleString()} ㎡ (${areaHa} ha)` : undefined;

        // ✅ 평면 키 + 중첩 키 모두 포함한 detail 뷰 모델
        const mapped = {
          // 상단 타이틀/주소 표시용
          name: data.landName ?? selected?.name,
          address: data.landRoadAddress || data.landAddress || selected?.address,
          emoji: selected?.emoji,

          // ✅ BE 평면 키들 그대로( FarmlandDetailPanel이 우선적으로 읽음 )
          landId: data.landId,
          landName: data.landName,
          landAddress: data.landAddress,
          landRoadAddress: data.landRoadAddress,
          landNumber: data.landNumber,
          landLat: data.landLat,
          landLng: data.landLng,
          landCrop: data.landCrop,
          landArea: data.landArea,
          soiltype: data.soiltype,
          waterSource: data.waterSource,

          // ✅ 소유자(평면)
          ownerName: data.ownerName,
          ownerAge: data.ownerAge,
          ownerAddress: data.ownerAddress,

          // ✅ 판매자 멘트/이미지(평면)
          sellerComment: data.landComent,
          image: data.landImage,

          // ✅ 중첩 구조 (FarmlandDetailPanel 보조 참조용)
          landInfo: {
            landId: data.landId,
            crop: data.landCrop ?? selected?.detail?.landInfo?.crop,
            areaHectare: areaHectareStr ?? selected?.detail?.landInfo?.areaHectare,
            location: data.landRoadAddress || data.landAddress || selected?.detail?.landInfo?.location,
            landNumber: data.landNumber ?? selected?.detail?.landInfo?.landNumber,
            soilType: data.soiltype ?? selected?.detail?.landInfo?.soilType,
            waterSource: data.waterSource ?? selected?.detail?.landInfo?.waterSource,
            owner: data.ownerName
              ? `${data.ownerName}${data.ownerAge != null ? ` (${data.ownerAge})` : ""}`
              : selected?.detail?.landInfo?.owner,
            lat: data.landLat,
            lng: data.landLng,
          },
          facilities: {
            water: data.landWater,
            elec: data.landElec,
            machine: data.landMachine,
            storage: data.landStorage,
            house: data.landHouse,
            fence: data.landFence,
          },
          access: {
            road: data.landRoad,
            wellRoad: data.landWellRoad,
            bus: data.landBus,
            car: data.landCar,
          },
          trade: {
            type: data.landTrade,
            match: data.landMatch,
            price: data.landPrice,
            when: data.landWhen,
            why: data.landWhy,
          },
        };

        setDetail(mapped);
      } catch (err) {
        if (!aborted) {
          console.error("[RightPanel] Fetch detail error:", err);
          setDetailError(err.message || "상세 불러오기 실패");
        }
      } finally {
        if (!aborted) setDetailLoading(false);
      }
    })();

    return () => {
      aborted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [landId]);

  if (!selected) return null;

  const handleApply = async () => {
    if (!landId) {
      alert("landId를 확인할 수 없습니다.");
      return;
    }
    if (applied || applying) return;

    try {
      setApplying(true);
      const token = localStorage.getItem("accessToken");
      await applyForFarmland({ landId, buyerId: 1, token });
      setApplied(true);
      onApply && onApply(selected);
      alert("신청이 완료되었습니다.");
    } catch (err) {
      console.error("[APPLY] error:", err);
      alert(err?.message || "신청 처리 중 오류가 발생했습니다.");
    } finally {
      setApplying(false);
    }
  };

  const handleToggleFavorite = () => {
    setIsFavorite((v) => !v);
    onToggleFavorite && onToggleFavorite(selected);
  };

  // ✅ 합성 뷰 모델: selected.detail을 깔고 detail로 덮어쓰기(상세 우선)
  const view = {
    emoji: selected?.emoji,
    name: detail?.name ?? selected?.name,
    address: detail?.address ?? selected?.address,
    detail: {
      ...(selected?.detail || {}),
      ...(detail || {}),
      // landInfo는 detail 우선
      landInfo: (detail && detail.landInfo) || selected?.detail?.landInfo,
    },
  };

  return (
    <div className="RightPanel-RightContainer">
      <div className="RightPanel-TopButtons">
        <button
          onClick={() => setShowDetail(true)}
          className="RightPanel-DetailButton"
          disabled={detailLoading || !!detailError}
          title={
            detailLoading
              ? "상세 불러오는 중…"
              : detailError
              ? "상세를 불러올 수 없습니다."
              : "상세 보기"
          }
        >
          {detailLoading ? "불러오는 중…" : "상세 보기"}
        </button>

        <div className="RightPanel-ActionGroup">
          <button
            className={`RightPanel-PrimaryButton ${applied || applying ? "is-disabled" : ""}`}
            onClick={handleApply}
            disabled={applied || applying || !landId}
            title={
              applied ? "이미 신청 완료" :
              applying ? "신청 처리 중..." :
              "이 농지에 매칭을 신청합니다"
            }
          >
            {applied ? "신청 완료" : applying ? "신청 중..." : "신청하기"}
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

      <div className="RightPanel-ImagePlaceholder">
        {/* UI는 '사진 자리' 그대로 유지 */}
        사진 자리
      </div>

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
      {pageIndex === 0 && view.detail?.landInfo && (
        <div className="RightPanel-InfoBlock">
          <h3 className="RightPanel-InfoTitle">
            {view.emoji} {view.name}
          </h3>

          <div className="RightPanel-InfoRow">
            <strong>📍 주소:</strong> {view.address}
          </div>

          <div className="RightPanel-InfoRow">
            <strong>🌱 작물:</strong> {view.detail.landInfo.crop}
          </div>
          <div className="RightPanel-InfoRow">
            <strong>📐 면적:</strong> {view.detail.landInfo.areaHectare}
          </div>
          <div className="RightPanel-InfoRow">
            <strong>🗺 위치:</strong> {view.detail.landInfo.location}
          </div>
          <div className="RightPanel-InfoRow">
            <strong>🏷 지번정보:</strong> {view.detail.landInfo.landNumber}
          </div>
          <div className="RightPanel-InfoRow">
            <strong>🧪 토양 유형:</strong> {view.detail.landInfo.soilType}
          </div>
          <div className="RightPanel-InfoRow">
            <strong>💧 수자원:</strong> {view.detail.landInfo.waterSource}
          </div>
          <div className="RightPanel-InfoRow">
            <strong>👩‍🌾 소유자:</strong> {view.detail.landInfo.owner}
          </div>

          {detailLoading && (
            <div className="RightPanel-InfoRow" style={{ opacity: 0.7 }}>
              상세 데이터를 불러오는 중입니다…
            </div>
          )}
          {detailError && (
            <div className="RightPanel-InfoRow" style={{ color: "#c00" }}>
              상세 데이터를 불러오지 못했습니다: {detailError}
            </div>
          )}
        </div>
      )}

      {/* 1. 🔥 AI 매칭 점수 */}
      {pageIndex === 1 && (
        <div className="RightPanel-InfoBlock">
          <h3 className="RightPanel-InfoTitle">🔥 AI 매칭 점수</h3>
          {!applicant || !match ? (
            <div className="RightPanel-InfoRow">지원자 데이터가 없습니다.</div>
          ) : (
            <>
              <div className="RightPanel-MatchHeader">
                <div>
                  <div className="RightPanel-MatchScore">{match.score}</div>
                  <div className="RightPanel-MatchLabel">/ 100</div>
                </div>
                <div className="RightPanel-MatchMeta">
                  <div>
                    <strong>지원자:</strong> {match.derived.applicant_name} (ID: {applicant.id})
                  </div>
                  <div>
                    <strong>거리:</strong> {match.derived.distance_km.toFixed(1)} km
                  </div>
                </div>
              </div>

              <div className="RightPanel-MatchBars">
                {match.parts.map((p) => (
                  <div key={p.key} className="RightPanel-MatchBarItem">
                    <div className="RightPanel-MatchBarTop">
                      <span>{p.key}</span>
                      <span>{p.value}점</span>
                    </div>
                    <div className="RightPanel-MatchBarTrack">
                      <div className="RightPanel-MatchBarFill" style={{ width: `${p.value}%` }} />
                    </div>
                    <div className="RightPanel-MatchBarNote">{p.note}</div>
                  </div>
                ))}
              </div>

              <div className="RightPanel-TagGroup">
                <div>
                  <strong>필요 작업</strong>
                  <div className="RightPanel-Tags">
                    {match.derived.required_tasks.map((t) => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <strong>도구로 커버</strong>
                  <div className="RightPanel-Tags">
                    {match.derived.tasks_covered_by_tools.map((t) => (
                      <span key={t} className="tag ok">{t}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <strong>추천/해당 작물</strong>
                  <div className="RightPanel-Tags">
                    {match.derived.recommended_crops.map((c) => (
                      <span key={c} className="tag">{c}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <strong>관심 작물</strong>
                  <div className="RightPanel-Tags">
                    {(applicant.interested_crops || []).map((c) => (
                      <span key={c} className="tag">{c}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <strong>선호 거래</strong>
                  <div className="RightPanel-Tags">
                    {(applicant.preferred_trade || []).map((t) => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* 2. 🤖 AI 기반 예상 수익 */}
      {pageIndex === 2 && view.detail?.aiProfit && (
        <div className="RightPanel-InfoBlock">
          <h3 className="RightPanel-InfoTitle">🤖 AI 기반 예상 수익</h3>
          <div className="RightPanel-InfoRow">
            <strong>총 예상 수익:</strong> {view.detail.aiProfit.yearlyProfit}
          </div>
          <div className="RightPanel-InfoRow">
            <strong>수확량:</strong> {view.detail.aiProfit.yield}
          </div>
          <div className="RightPanel-InfoRow">
            <strong>작물 단가:</strong> {view.detail.aiProfit.unitPrice}
          </div>
          <div className="RightPanel-InfoRow">
            <strong>비용 분석</strong>
          </div>
          <div className="RightPanel-InfoRow">ㆍ비료 및 자재: {view.detail.aiProfit.cost.material}</div>
          <div className="RightPanel-InfoRow">ㆍ인건비: {view.detail.aiProfit.cost.labor}</div>
          <div className="RightPanel-InfoRow">ㆍ기계·임차비: {view.detail.aiProfit.cost.machine}</div>
          <div className="RightPanel-InfoRow">
            <strong>예상 순수익:</strong> {view.detail.aiProfit.netProfit}
          </div>
        </div>
      )}

      {/* 3. 🤝 신뢰 매칭 현황 */}
      {pageIndex === 3 && view.detail?.trustMatch && (
        <div className="RightPanel-InfoBlock">
          <h3 className="RightPanel-InfoTitle">🤝 신뢰 매칭 현황</h3>
          <div className="RightPanel-InfoRow">
            <strong>현재 매칭 상태:</strong> {view.detail.trustMatch.status}
          </div>
          <div className="RightPanel-InfoRow">
            <strong>매칭 희망 조건:</strong>
          </div>
          <ul>
            {view.detail.trustMatch.preferences.map((pref, idx) => (
              <li key={idx}>ㆍ{pref}</li>
            ))}
          </ul>
          <div className="RightPanel-InfoRow">
            <strong>추천 청년:</strong> {view.detail.trustMatch.waitingYouth}명 대기 중
          </div>
        </div>
      )}

      {/* 4. 👵 판매자 한마디 */}
      {pageIndex === 4 && (
        <div className="RightPanel-InfoBlock">
          <h3 className="RightPanel-InfoTitle">👵 판매자 한마디</h3>
          <blockquote style={{ fontStyle: "italic", color: "#555" }}>
            "{view.detail?.sellerComment || "멘트가 없습니다."}"
          </blockquote>
        </div>
      )}

      {/* 중앙 상세 패널 */}
      {showDetail && (
        <div className="RightPanel-ModalOverlay">
          <FarmlandDetailPanel data={view.detail} onClose={() => setShowDetail(false)} />
        </div>
      )}
    </div>
  );
}

export default RightPanel;
