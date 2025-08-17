// RightPanel.jsx
import { useState, useEffect } from "react";
import "./RightPanel.css";
import FarmlandDetailPanel from "./FarmlandDetailPanel";

// ⬇️ 그대로 유지
import { getApplicants } from "../../api/applicantOne";
import { applyForFarmland } from "../../api/applicantions";
import { computeMatching } from "../../utils/matching";

function RightPanel({ selected, onClose, onApply, onToggleFavorite }) {
  const [pageIndex, setPageIndex] = useState(0);
  const [showDetail, setShowDetail] = useState(false);

  // ✅ 신청 상태/로딩 상태
  const [applied, setApplied] = useState(false);
  const [applying, setApplying] = useState(false);

  const [isFavorite, setIsFavorite] = useState(false);
  const [applicant, setApplicant] = useState(null);
  const [match, setMatch] = useState(null);

  const maxPage = 4;

  useEffect(() => {
    setPageIndex(0);
    setShowDetail(false);
    setApplied(false);
    setIsFavorite(false);

    (async () => {
      const list = await getApplicants();
      const picked = list.find((a) => a.id === 77) || list[0];
      setApplicant(picked || null);

      if (selected && picked) {
        const res = computeMatching(selected, picked);
        setMatch(res);
      } else {
        setMatch(null);
      }
    })();
  }, [selected]);

  if (!selected) return null;

  // landId 추출(백엔드 DTO에 맞게 id/landId 양쪽 대비)
  const landId =
    selected?.id ??
    selected?.landId ??
    selected?.raw?.landId ??
    selected?.detail?.landInfo?.landId;

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
      onApply && onApply(selected); // 상위 콜백(필요 시)
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
            className={`RightPanel-PrimaryButton ${
              applied || applying ? "is-disabled" : ""
            }`}
            onClick={handleApply}
            disabled={applied || applying || !landId}
            title={
              applied
                ? "이미 신청 완료"
                : applying
                ? "신청 처리 중..."
                : "이 농지에 매칭을 신청합니다"
            }
          >
            {applied ? "신청 완료" : applying ? "신청 중..." : "신청하기"}
          </button>

          <button
            className={`RightPanel-SecondaryButton ${
              isFavorite ? "active" : ""
            }`}
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
                    <strong>지원자:</strong> {match.derived.applicant_name} (ID:{" "}
                    {applicant.id})
                  </div>
                  <div>
                    <strong>거리:</strong>{" "}
                    {match.derived.distance_km.toFixed(1)} km
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
                      <div
                        className="RightPanel-MatchBarFill"
                        style={{ width: `${p.value}%` }}
                      />
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
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <strong>도구로 커버</strong>
                  <div className="RightPanel-Tags">
                    {match.derived.tasks_covered_by_tools.map((t) => (
                      <span key={t} className="tag ok">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <strong>추천/해당 작물</strong>
                  <div className="RightPanel-Tags">
                    {match.derived.recommended_crops.map((c) => (
                      <span key={c} className="tag">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <strong>관심 작물</strong>
                  <div className="RightPanel-Tags">
                    {(applicant.interested_crops || []).map((c) => (
                      <span key={c} className="tag">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <strong>선호 거래</strong>
                  <div className="RightPanel-Tags">
                    {(applicant.preferred_trade || []).map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* 2. AI 기반 예상 수익 */}
      {pageIndex === 2 && selected.detail?.aiProfit && (
        <div className="RightPanel-InfoBlock">
          <h3 className="RightPanel-InfoTitle">🤖 AI 기반 예상 수익</h3>
          <div className="RightPanel-InfoRow">
            <strong>총 예상 수익:</strong>{" "}
            {selected.detail.aiProfit.yearlyProfit}
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

      {/* 3. 신뢰 매칭 현황 */}
      {pageIndex === 3 && selected.detail?.trustMatch && (
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
            <strong>추천 청년:</strong>{" "}
            {selected.detail.trustMatch.waitingYouth}명 대기 중
          </div>
        </div>
      )}

      {/* 4. 판매자 멘트 */}
      {pageIndex === 4 && (
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
          <FarmlandDetailPanel
            data={selected.detail}
            onClose={() => setShowDetail(false)}
          />
        </div>
      )}
    </div>
  );
}

export default RightPanel;
