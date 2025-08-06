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
  const [map, setMap] = useState(null);

  useEffect(() => {
    getFarmlandData().then(setFarmlands);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <MapView
        farmlands={farmlands}
        onSelect={setSelectedFarmland}
        onMapLoad={setMap}
        selectedFarm={selectedFarmland}
      />
      <Header />
      <LeftPanel farmlands={farmlands} onSelect={setSelectedFarmland} />
      <RightPanel
        selected={selectedFarmland}
        onClose={() => setSelectedFarmland(null)}
      />
      <BottomPanel map={map} />
    </div>
  );
}

export default MainPage;
