import { useEffect, useRef, useState } from "react";

const addFarmMarkers = (map, farmlands, onSelect) => { // 마커 이미지 설정
  const blackMarkerImage = new window.kakao.maps.MarkerImage( // marker-black.png
    "/marker-black.png",
    new window.kakao.maps.Size(32, 32)
  );
  const blueMarkerImage = new window.kakao.maps.MarkerImage( // marker-blue.png
    "/marker-blue.png",
    new window.kakao.maps.Size(50, 50)
  );

  let currentMarker = null; // 현재 선택된 마커

  farmlands.forEach((farm) => { // 각 농지에 대해 마커 생성
    const marker = new window.kakao.maps.Marker({ // 마커 생성
      map,
      position: new window.kakao.maps.LatLng(farm.lat, farm.lng),
      title: farm.name,
      image: blackMarkerImage,
    });

    window.kakao.maps.event.addListener(marker, "click", () => { // 마커 클릭 이벤트
      if (currentMarker) currentMarker.setImage(blackMarkerImage);
      marker.setImage(blueMarkerImage);
      currentMarker = marker;

      map.setLevel(3); // 지도 레벨 조정
      map.panTo(marker.getPosition()); // 지도 중심 이동

      if (onSelect) onSelect(farm); // 선택된 농지 정보 전달
    });
  });
};

function MapView({ farmlands, onSelect, onMapLoad }) {
  const mapRef = useRef(null); // 카카오 맵 인스턴스를 저장할 Ref
  const [isMapReady, setIsMapReady] = useState(false); // 맵 로딩 상태

  // 1 지도 로딩
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
        setIsMapReady(true); // map 준비 완료
        if (onMapLoad) onMapLoad(map);
      });
    };

    document.head.appendChild(script);
  }, []);

  // 2️ 마커 렌더링은 map과 farmlands가 모두 준비된 후 실행
  useEffect(() => {
    const map = mapRef.current;
    if (!isMapReady || !map || farmlands.length === 0) return;

    addFarmMarkers(map, farmlands, onSelect);
  }, [isMapReady, farmlands, onSelect]);

  return ( // 3️ 맵 컨테이너 렌더링
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
