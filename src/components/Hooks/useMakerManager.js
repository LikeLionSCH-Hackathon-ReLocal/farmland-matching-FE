import { useEffect, useRef, useState } from "react";

export function useMarkerManager(map, farmlands, onSelect) {
  const markerMap = useRef(new Map());
  const circleMap = useRef(new Map());
  const [activeId, setActiveId] = useState(null);

  const blackMarkerImage =
    typeof window !== "undefined" && window.kakao
      ? new window.kakao.maps.MarkerImage(
          "/marker-black.png",
          new window.kakao.maps.Size(25, 25)
        )
      : null;

  const blueMarkerImage =
    typeof window !== "undefined" && window.kakao
      ? new window.kakao.maps.MarkerImage(
          "/marker-blue.png",
          new window.kakao.maps.Size(40, 40)
        )
      : null;

  useEffect(() => {
    if (!map || !window.kakao || !blackMarkerImage || !blueMarkerImage) return;

    // 기존 마커/원 제거
    markerMap.current.forEach((marker) => marker.setMap(null));
    circleMap.current.forEach((circle) => circle.setMap(null));
    markerMap.current.clear();
    circleMap.current.clear();

    farmlands.forEach((farm) => {
      const position = new window.kakao.maps.LatLng(farm.lat, farm.lng);

      // 마커 추가
      const marker = new window.kakao.maps.Marker({
        map,
        position,
        title: farm.name,
        image: blackMarkerImage,
      });

      window.kakao.maps.event.addListener(marker, "click", () => {
        onSelect(farm);
        setActiveId(farm.id);
      });

      markerMap.current.set(farm.id, marker);

      // ⭕ 원 추가 (면적 기준)
      const radius = Math.sqrt(farm.area) * 10; // 면적이 클수록 반지름 크게 (튜닝 가능)
      const circle = new window.kakao.maps.Circle({
        center: position,
        radius: radius, // meter 단위
        strokeWeight: 1,
        strokeColor: "#3399ff",
        strokeOpacity: 0.6,
        strokeStyle: "solid",
        fillColor: "#3399ff",
        fillOpacity: 0.15,
        zIndex: 0,
      });
      circle.setMap(map);
      circleMap.current.set(farm.id, circle);
      // ✅ 이모지 오버레이 추가
      const emojiContent = document.createElement("div");
      emojiContent.className = "useMakerManager-emoji-overlay";
      emojiContent.innerText = farm.emoji;

      const emojiOverlay = new window.kakao.maps.CustomOverlay({
        content: emojiContent,
        position: position,
        xAnchor: 0.5, // 가운데 정렬
        yAnchor: 0, // 마커 아래로 이동
        zIndex: 1,
      });
      emojiOverlay.setMap(map);
    });
  }, [map, farmlands]);

  useEffect(() => {
    if (!map) return;
    markerMap.current.forEach((marker, id) => {
      marker.setImage(id === activeId ? blueMarkerImage : blackMarkerImage);
    });
  }, [activeId]);

  const focusOnFarm = (farm) => {
    if (!map || !farm) return;
    const marker = markerMap.current.get(farm.id);
    if (!marker) return;

    setActiveId(farm.id);

    const target = marker.getPosition();
    map.setLevel(4);
    setTimeout(() => {
      map.panTo(target);
    }, 100);
  };

  return { focusOnFarm };
}
