import { useEffect, useState } from "react";
import Header from "../../components/Pannel/Header";
import LeftPanel from "../../components/Pannel/LeftPanel";
import RightPanel from "../../components/Pannel/RightPanel";
import BottomPanel from "../../components/Pannel/BottomPanel";
import MapView from "../../components/Map/MapView";
import { getFarmlandData } from "../../api/farmland";

function MainPage() {
  const [farmlands, setFarmlands] = useState([]);
  const [selectedFarmland, setSelectedFarmland] = useState(null);
  const [map, setMap] = useState(null); // 지도 객체 상태 추가

  useEffect(() => {
    getFarmlandData().then(setFarmlands);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <MapView
        farmlands={farmlands}
        onSelect={setSelectedFarmland}
        onMapLoad={setMap} // 지도 객체 설정
        selectedFarm={selectedFarmland} // 선택된 농지 정보 전달
      />
      <Header />
      <LeftPanel farmlands={farmlands} onSelect={setSelectedFarmland} />
      <RightPanel
        selected={selectedFarmland}
        onClose={() => setSelectedFarmland(null)} // ✨ 닫기 기능 연결
      />
      <BottomPanel map={map} /> {/*  map 객체 전달 */}
    </div>
  );
}

export default MainPage;
