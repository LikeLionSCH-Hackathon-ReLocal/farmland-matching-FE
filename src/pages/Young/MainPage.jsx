// MainPage.jsx
import { useEffect, useState } from "react";
import Header from "../../components/Pannel/Header";
import LeftPanel from "../../components/Pannel/LeftPanel";
import RightPanel from "../../components/Pannel/RightPanel";
import BottomPanel from "../../components/Pannel/BottomPanel";
import MapView from "../../components/Map/MapView";
import { fetchFarmlands } from "../../api/farmland";
import { getYoungUserData } from "../../api/YoungUser"; // ⬅ 추가
import ProfileModal from "../../components/Pannel/ProfileModal"; // ⬅ 새 컴포넌트

function MainPage() {
  const [farmlands, setFarmlands] = useState([]);
  const [selectedFarmland, setSelectedFarmland] = useState(null);
  const [map, setMap] = useState(null);

  const [showProfile, setShowProfile] = useState(false); // ⬅ 추가
  const [youngUser, setYoungUser] = useState(null); // ⬅ 추가
  const [userLoading, setUserLoading] = useState(true); // ⬅ 추가

  useEffect(() => {
    (async () => {
      try {
        const rows = await fetchFarmlands();
        setFarmlands(rows);
      } catch (e) {
        console.error("[farmlands] load error:", e);
        setFarmlands([]); // 실패 시 빈 배열
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
      <MapView
        farmlands={farmlands}
        onSelect={setSelectedFarmland}
        onMapLoad={setMap}
        selectedFarm={selectedFarmland}
      />

      {/* 헤더에서 버튼 누르면 MainPage가 모달을 띄움 */}
      <Header onOpenProfile={() => setShowProfile(true)} />

      <LeftPanel farmlands={farmlands} onSelect={setSelectedFarmland} />
      <RightPanel
        selected={selectedFarmland}
        onClose={() => setSelectedFarmland(null)}
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
    </div>
  );
}

export default MainPage;
