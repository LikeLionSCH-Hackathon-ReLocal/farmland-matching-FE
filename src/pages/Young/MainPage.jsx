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
const BUYER_ID_DEFAULT = 1;
const TOPK_DEFAULT = 5;

function MainPage() {
  const [farmlands, setFarmlands] = useState([]);
  const [selectedFarmland, setSelectedFarmland] = useState(null);
  const [map, setMap] = useState(null);

  const [showProfile, setShowProfile] = useState(false);
  const [youngUser, setYoungUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  // 채팅 오버레이 상태
  const [showChat, setShowChat] = useState(false);
  const [chatProps, setChatProps] = useState(null); // { landId, buyerId, landName, ownerName }

  // AI 추천 모드 상태/로딩
  const [aiMode, setAiMode] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  // 서버에서 받아온 리스트에 aiMatchScore를 끌어올림(_raw.aiMatchScore → aiMatchScore)
  const attachAiScore = (rows) =>
    (rows || []).map((f) => {
      const score = Number(f?.aiMatchScore ?? f?._raw?.aiMatchScore ?? 0);
      const landId = f?.id ?? f?._raw?.landId;
      console.log("[attachAiScore] landId:", landId, "score:", score);
      return { ...f, aiMatchScore: score };
    });

  const loadFarmlands = async () => {
    setLoading(true);
    try {
      console.log("[loadFarmlands] GET /farmland 요청 시작");
      const rows = await fetchFarmlands();
      const withScore = attachAiScore(rows);
      console.log("[loadFarmlands] 응답 개수:", withScore.length);
      setFarmlands(withScore);
    } catch (e) {
      console.error("[loadFarmlands] error:", e);
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
      try {
        console.log("[MainPage] getYoungUserData 호출");
        const list = await getYoungUserData();
        setYoungUser(list?.[0] || null);
      } catch (e) {
        console.error("[MainPage] getYoungUserData error:", e);
      } finally {
        setUserLoading(false);
      }
    })();
  }, []);

  // 🔵 AI 버튼: 군집화/점수계산 트리거 → 재조회 → AI 모드 ON
  const handleAiRecommend = async () => {
    const url = `${BASE_URL}/farmland/aiMatch`;
    const payload = { buyerId: BUYER_ID_DEFAULT, topK: TOPK_DEFAULT };
    const startedAt = performance.now();

    console.log("[AI] POST 요청 시작:", url, "payload:", payload);

    setAiLoading(true);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const durationMs = Math.round(performance.now() - startedAt);
      const requestId =
        res.headers.get("x-request-id") ||
        res.headers.get("X-Request-Id") ||
        res.headers.get("x-correlation-id") ||
        null;

      console.log("[AI] 응답 수신",
        { status: res.status, statusText: res.statusText, durationMs, requestId }
      );

      // 응답 본문 로깅: JSON 시도 → 실패 시 text
      let responseBody = null;
      try {
        const clone = res.clone();
        responseBody = await clone.json();
      } catch {
        try {
          responseBody = await res.text();
        } catch {
          responseBody = "<no body>";
        }
      }
      console.log("[AI] 응답 본문:", responseBody);

      if (!res.ok) {
        // 서버 메시지 추출
        const msg =
          (responseBody && (responseBody.message || responseBody.error)) ||
          (typeof responseBody === "string" ? responseBody.slice(0, 300) : "") ||
          "원인 미상";
        alert(`AI 추천 호출 실패 (status ${res.status})\n메시지: ${msg}\n자세한 로그는 콘솔을 확인하세요.`);
        return;
      }

      // 성공: 백엔드가 DB에 점수를 반영했다고 가정 → 재조회
      await loadFarmlands();
      setAiMode(true);
      setSelectedFarmland(null);
      console.log("[AI] 추천 모드 ON");
    } catch (e) {
      console.error("[AI] fetch 예외:", e);
      alert("AI 추천 호출 실패 (네트워크/예외). 콘솔을 확인하세요.");
    } finally {
      setAiLoading(false);
    }
  };

  // 🔙 AI 추천 해제
  const exitAiMode = async () => {
    console.log("[AI] 추천 모드 해제");
    setAiMode(false);
    await loadFarmlands(); // 원본 순서/목록으로 복귀
    setSelectedFarmland(null);
  };

  // 🔎 LeftPanel로 전달할 표시용 목록 계산
  const displayFarmlands = useMemo(() => {
    if (!aiMode) return farmlands;

    const sorted = [...farmlands]
      .filter((f) => (f.aiMatchScore ?? 0) > 0)
      .sort((a, b) => (b.aiMatchScore ?? 0) - (a.aiMatchScore ?? 0));

    console.log(
      "[displayFarmlands] AI 모드 목록:",
      sorted.map((f) => ({ id: f.id, score: f.aiMatchScore }))
    );

    return sorted;
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
        // 채팅 버튼 → 중앙 오버레이 ChatPage
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

      {/* 채팅 오버레이 */}
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
