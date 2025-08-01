import { useState } from "react";
import "./BottomPanel.css";

function BottomPanel({ map }) {
  const [activeOverlays, setActiveOverlays] = useState({
    traffic: false,
    terrain: false,
    bicycle: false,
  });

  const setMapType = (type) => {
    if (!map || !window.kakao) return;
    const { ROADMAP, HYBRID } = window.kakao.maps.MapTypeId;
    map.setMapTypeId(type === "roadmap" ? ROADMAP : HYBRID);
  };

  const toggleOverlay = (type) => {
    if (!map || !window.kakao) return;

    const mapTypeId = window.kakao.maps.MapTypeId[type.toUpperCase()];
    const isActive = activeOverlays[type];

    if (isActive) {
      map.removeOverlayMapTypeId(mapTypeId);
    } else {
      map.addOverlayMapTypeId(mapTypeId);
    }

    // 상태 업데이트
    setActiveOverlays((prev) => ({
      ...prev,
      [type]: !isActive,
    }));
  };

  const zoom = (dir) => {
    if (!map) return;
    const level = map.getLevel();
    map.setLevel(dir === "in" ? level - 1 : level + 1);
  };

  return (
    <div className="BottomContainer">
      <button onClick={() => setMapType("roadmap")}>🗺 일반</button>
      <button onClick={() => setMapType("satellite")}>🛰 위성</button>

      <button
        onClick={() => toggleOverlay("terrain")}
        className={activeOverlays.terrain ? "active" : ""}
      >
        ⛰ 지형
      </button>
      <button
        onClick={() => toggleOverlay("traffic")}
        className={activeOverlays.traffic ? "active" : ""}
      >
        🚗 교통
      </button>
      <button
        onClick={() => toggleOverlay("bicycle")}
        className={activeOverlays.bicycle ? "active" : ""}
      >
        🚴 자전거
      </button>

      <button onClick={() => zoom("in")}>➕ 줌인</button>
      <button onClick={() => zoom("out")}>➖ 줌아웃</button>
    </div>
  );
}

export default BottomPanel;
