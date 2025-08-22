// MainPage.jsx
import { useEffect, useMemo, useState } from "react";
import Header from "../../components/Pannel/Header";
import LeftPanel from "../../components/Pannel/LeftPanel";
import RightPanel from "../../components/Pannel/RightPanel";
import BottomPanel from "../../components/Pannel/BottomPanel";
import MapView from "../../components/Map/MapView";
import ChatPage from "../../components/Pannel/ChatPage";  // ⬅️ 오버레이로 띄울 채팅 페이지
import { fetchFarmlands } from "../../api/farmland";
import { getYoungUserData } from "../../api/YoungUser";
import ProfileModal from "../../components/Pannel/ProfileModal";

const BASE_URL = process.env.REACT_APP_API_BASE || "http://localhost:8080";

function MainPage() {
  const [farmlands, setFarmlands] = useState([]);
  const [selectedFarmland, setSelectedFarmland] = useState(null);
  const [map, setMap] = useState(null);

  const [showProfile, setShowProfile] = useState(false);
  const [youngUser, setYoungUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  // ⬅️ 채팅 오버레이 상태
  const [showChat, setShowChat] = useState(false);
  const [chatProps, setChatProps] = useState(null); // { landId, buyerId, landName, ownerName }

  // 🔹 AI 추천 모드 상태/로딩
  const [aiMode, setAiMode] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  // 공통: 서버에서 받아온 리스트에 aiMatchScore를 주입(기존 farmland.js는 _raw만 들고 있으므로 여기서 상위 필드로 승격)
  const attachAiScore = (rows) =>
    (rows || []).map((f) => ({
      ...f,
      aiMatchScore: Number(f?.aiMatchScore ?? f?._raw?.aiMatchScore ?? 0),
    }));

  const loadFarmlands = async () => {
    setLoading(true);
    try {
      const rows = await fetchFarmlands();
      setFarmlands(attachAiScore(rows));
    } catch (e) {
      console.error("[farmlands] load error:", e);
      setFarmlands([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await loadFarmlands();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const list = await getYoungUserData();
      setYoungUser(list?.[0] || null);
      setUserLoading(false);
    })();
  }, []);

  // 🔵 AI 버튼: 군집화/점수계산 트리거 → 재조회 → AI 모드 ON
  const handleAiRecommend = async () => {
    setAiLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/farmland/aiMatch`, { method: "POST" });
      if (!res.ok) throw new Error(`POST /farmland/aiMatch 실패: ${res.status}`);
      await loadFarmlands();              // 최신 aiMatchScore 반영
      setAiMode(true);                    // AI 모드 진입
      // 선택된 농지가 추천 목록에서 제외되었을 수 있으므로 선택 클리어
      setSelectedFarmland(null);
    } catch (e) {
      console.error(e);
      alert("AI 추천 호출에 실패했습니다.");
    } finally {
      setAiLoading(false);
    }
  };

  // 🔙 AI 추천 해제
  const exitAiMode = async () => {
    setAiMode(false);
    await loadFarmlands(); // 원본 순서/목록으로 복귀
    setSelectedFarmland(null);
  };

  // 🔎 LeftPanel로 전달할 표시용 목록 계산
  const displayFarmlands = useMemo(() => {
    if (!aiMode) return farmlands;

    // aiMatchScore > 0만 남기고 점수 내림차순
    return [...farmlands]
      .filter((f) => (f.aiMatchScore ?? 0) > 0)
      .sort((a, b) => (b.aiMatchScore ?? 0) - (a.aiMatchScore ?? 0));
  }, [aiMode, farmlands]);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* 중앙 지도는 항상 유지 */}
      <MapView
        farmlands={displayFarmlands}
        onSelect={setSelectedFarmland}
        onMapLoad={setMap}
        selectedFarm={selectedFarmland}
      />

      {/* 상단 헤더 */}
      <Header onOpenProfile={() => setShowProfile(true)} />

      {/* 좌/우/하단 패널 */}
      <LeftPanel
        farmlands={displayFarmlands}
        onSelect={setSelectedFarmland}
        // AI 관련
        onAiRecommend={handleAiRecommend}
        onExitAiMode={exitAiMode}
        aiMode={aiMode}
        aiLoading={aiLoading}
        loading={loading}
      />

      <RightPanel
        selected={selectedFarmland}
        onClose={() => setSelectedFarmland(null)}
        // ⬇️ RightPanel에서 "채팅" 클릭 시 중앙 오버레이로 ChatPage 띄움
        onOpenChat={(props) => {
          setChatProps(props);
          setShowChat(true);
        }}
      />

      <BottomPanel map={map} />

      {/* 프로필 모달 */}
      {showProfile && (
        <ProfileModal
          user={youngUser}
          loading={userLoading}
          onClose={() => setShowProfile(false)}
        />
      )}

      {/* 🔵 채팅 오버레이 (지도/패널 위에 포개짐) */}
      {showChat && chatProps && (
        <ChatPage
          {...chatProps}
          onClose={() => setShowChat(false)}
        />
      )}
    </div>
  );
}

export default MainPage;
