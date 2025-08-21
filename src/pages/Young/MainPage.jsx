// MainPage.jsx
import { useEffect, useState } from "react";
import Header from "../../components/Pannel/Header";
import LeftPanel from "../../components/Pannel/LeftPanel";
import RightPanel from "../../components/Pannel/RightPanel";
import BottomPanel from "../../components/Pannel/BottomPanel";
import MapView from "../../components/Map/MapView";
import ChatPage from "../../components/Pannel/ChatPage";  // ⬅️ 오버레이로 띄울 채팅 페이지
import { fetchFarmlands } from "../../api/farmland";
import { getYoungUserData } from "../../api/YoungUser";
import ProfileModal from "../../components/Pannel/ProfileModal";

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

  useEffect(() => {
    (async () => {
      try {
        const rows = await fetchFarmlands();
        setFarmlands(rows);
      } catch (e) {
        console.error("[farmlands] load error:", e);
        setFarmlands([]);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const list = await getYoungUserData();
      setYoungUser(list?.[0] || null);
      setUserLoading(false);
    })();
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* 중앙 지도는 항상 유지 */}
      <MapView
        farmlands={farmlands}
        onSelect={setSelectedFarmland}
        onMapLoad={setMap}
        selectedFarm={selectedFarmland}
      />

      {/* 상단 헤더 */}
      <Header onOpenProfile={() => setShowProfile(true)} />

      {/* 좌/우/하단 패널은 그대로 유지 */}
      <LeftPanel farmlands={farmlands} onSelect={setSelectedFarmland} />
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
