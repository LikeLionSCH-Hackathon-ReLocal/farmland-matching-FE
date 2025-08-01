import { useEffect, useRef, useState } from "react";
import { useMarkerManager } from "../Hooks/useMakerManager"; // 경로 조정 필요

function MapView({ farmlands, onSelect, onMapLoad, selectedFarm }) {
  const mapRef = useRef(null);
  const [isMapReady, setIsMapReady] = useState(false);

  const { focusOnFarm } = useMarkerManager(mapRef.current, farmlands, onSelect);

  // 1. 지도 로딩
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=15fedfbec0fde1d7f3ba7a8050c063d5&autoload=false";
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        if (!container) return;

        const map = new window.kakao.maps.Map(container, {
          center: new window.kakao.maps.LatLng(36.7691, 126.9334),
          level: 6,
        });

        mapRef.current = map;
        setIsMapReady(true);
        if (onMapLoad) onMapLoad(map);
      });
    };

    document.head.appendChild(script);
  }, []);

  // 2. 왼쪽 패널에서 선택된 농지에 반응하여 줌인 및 마커 강조
  useEffect(() => {
    if (selectedFarm && focusOnFarm) {
      focusOnFarm(selectedFarm);
    }
  }, [selectedFarm, focusOnFarm]);

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <div
        id="map"
        style={{
          width: "100%",
          height: "100%",
          border: "2px solid #aaa",
          zIndex: 0,
        }}
      />
    </div>
  );
}

export default MapView;
