import { useMemo, useState } from "react";
import "./LeftPanel.css";

function LeftPanel({
  farmlands,
  onSelect,
  // AI 관련 prop
  onAiRecommend = () => {},
  onExitAiMode = () => {},
  aiMode = false,
  aiLoading = false,
  loading = false,
}) {
  const [searchText, setSearchText] = useState("");
  const [filterKey, setFilterKey] = useState("address");

  console.log("[LeftPanel] props:", {
    aiMode,
    aiLoading,
    loading,
    farmlandsCount: farmlands?.length,
  });

  const filterOptions = ["address", "crop", "area", "price"];

  // 필터링된 목록
  const filteredFarmlands = useMemo(() => {
    const txt = String(searchText ?? "").toLowerCase();
    const list = (farmlands || []).filter((farm) => {
      const value = farm?.[filterKey];
      if (filterKey === "area" || filterKey === "price") {
        const num = parseInt(txt, 10);
        return Number.isNaN(num) || Number(farm?.[filterKey]) >= num;
      }
      return String(value ?? "")
        .toLowerCase()
        .includes(txt);
    });
    console.log(
      "[LeftPanel] filterKey:",
      filterKey,
      "검색어:",
      txt,
      "필터링 후:",
      list.length
    );
    return list;
  }, [farmlands, filterKey, searchText]);

  return (
    <div className="LeftPanel-LeftContainer">
      {/* 검색/필터 헤더 */}
      <div className="LeftPanel-LeftHeader">
        <input
          className="LeftPanel-SearchInput"
          placeholder={`${filterKey} 검색`}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          disabled={loading || aiLoading}
        />

        <div className="LeftPanel-FilterBar">
          {filterOptions.map((key) => (
            <button
              key={key}
              className={`LeftPanel-FilterButton ${
                filterKey === key ? "active" : ""
              }`}
              onClick={() => {
                console.log("[LeftPanel] 필터 변경:", key);
                setFilterKey(key);
                setSearchText(""); // 필터 바꾸면 검색 초기화
              }}
              disabled={loading || aiLoading}
            >
              {key === "address"
                ? "주소"
                : key === "crop"
                ? "작물"
                : key === "area"
                ? "면적"
                : key === "price"
                ? "가격"
                : key}
            </button>
          ))}

          {/* 🔵 AI 버튼 / 해제 버튼 */}
          {!aiMode ? (
            <button
              className={`LeftPanel-FilterButton ${
                aiLoading ? "disabled" : "ai"
              }`}
              onClick={() => {
                console.log("[LeftPanel] AI 버튼 클릭");
                onAiRecommend();
              }}
              disabled={aiLoading || loading}
              title="AI 군집화/추천 실행"
            >
              {aiLoading ? "AI 계산중..." : "AI"}
            </button>
          ) : (
            <button
              className="LeftPanel-FilterButton active"
              onClick={() => {
                console.log("[LeftPanel] AI 추천 끄기 클릭");
                onExitAiMode();
              }}
              disabled={aiLoading || loading}
              title="AI 추천 끄기"
            >
              AI 추천 끄기
            </button>
          )}
        </div>
      </div>

      {/* 농지 목록 */}
      <div className="LeftPanel-FarmlandList">
        {filteredFarmlands.map((farm, idx) => {
          console.log("[LeftPanel] render farmland:", {
            id: farm.id,
            name: farm.name,
            score: farm.aiMatchScore,
          });
          return (
            <div
              key={farm.id}
              className="LeftPanel-FarmlandCard"
              onClick={() => {
                console.log("[LeftPanel] 선택 farmland:", farm.id, farm.name);
                onSelect(farm);
              }}
            >
              <div className="LeftPanel-FarmlandImage">{farm.emoji}</div>
              <div className="LeftPanel-FarmlandContent">
                <div className="LeftPanel-FarmlandTitle">
                  <div className="LeftPanel-FarmlandTag">{farm.crop}</div>
                  <div className="LeftPanel-Left-FarmlandName">{farm.name}</div>
                </div>

                <div className="LeftPanel-FarmlandMeta">
                  📍 {farm.address} <br />
                  📐 {farm.area}㎡ / 💰 {farm.price}만원
                </div>
              </div>

              {/* ➤ 기본 화살표 + (AI모드일 때 점수/순위 뱃지) */}
              <div className="LeftPanel-FarmlandArrow">
                {aiMode ? (
                  farm.aiMatchScore != null ? (
                    <div
                      className="LeftPanel-AIScoreBadge"
                      title="AI 추천 점수"
                    >
                      <div className="rank">#{idx + 1}</div>
                      <div className="score">{farm.aiMatchScore}</div>
                    </div>
                  ) : (
                    "➤" // 점수가 null이면 기본 화살표 표시
                  )
                ) : (
                  "➤"
                )}
              </div>
            </div>
          );
        })}

        {/* 빈 상태 */}
        {filteredFarmlands.length === 0 && (
          <div className="LeftPanel-Empty">
            {aiMode
              ? "AI 추천 대상 농지가 없습니다. (aiMatchScore가 0)"
              : "조건에 맞는 농지가 없습니다."}
          </div>
        )}
      </div>
    </div>
  );
}

export default LeftPanel;
