import { useEffect, useRef, useState } from "react";

export function useMarkerManager(map, farmlands, onSelect) {
  const markerMap = useRef(new Map());
  const [activeId, setActiveId] = useState(null);

  const blackMarkerImage =
    typeof window !== "undefined" && window.kakao
      ? new window.kakao.maps.MarkerImage("/marker-black.png", new window.kakao.maps.Size(32, 32))
      : null;

  const blueMarkerImage =
    typeof window !== "undefined" && window.kakao
      ? new window.kakao.maps.MarkerImage("/marker-blue.png", new window.kakao.maps.Size(50, 50))
      : null;

  useEffect(() => {
    if (!map || !window.kakao || !blackMarkerImage || !blueMarkerImage) return;

    markerMap.current.forEach((marker) => marker.setMap(null));
    markerMap.current.clear();

    farmlands.forEach((farm) => {
      const marker = new window.kakao.maps.Marker({
        map,
        position: new window.kakao.maps.LatLng(farm.lat, farm.lng),
        title: farm.name,
        image: blackMarkerImage,
      });

      window.kakao.maps.event.addListener(marker, "click", () => {
        onSelect(farm);
        setActiveId(farm.id);
      });

      markerMap.current.set(farm.id, marker);
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
    map.setLevel(3); // 줌인 먼저 설정

    // 부드러운 panTo 애니메이션을 약간 지연시켜 적용
    setTimeout(() => {
      map.panTo(target);
    }, 100);
  };

  return { focusOnFarm };
}