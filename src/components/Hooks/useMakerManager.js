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

  // ✅ 부드럽게 fillOpacity만 진동하는 pulse 애니메이션
  function animateCirclePulseInfinite(circle) {
    if (!circle || typeof circle.setOptions !== "function") return;

    let startTime = null;
    const baseOpacity = 0.15;

    function animate(time) {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;

      // opacity: 0.05 ~ 0.25 사이로 부드럽게 진동
const opacity = 0.15 * Math.sin(elapsed / 400) + baseOpacity;
      circle.setOptions({ fillOpacity: opacity });

      circle.__animationId = requestAnimationFrame(animate);
    }

    if (circle.__animationId) {
      cancelAnimationFrame(circle.__animationId);
    }

    animate();
  }

  // ✅ 애니메이션 정지 및 원상 복구
  function stopCircleAnimation(circle) {
    if (circle && circle.__animationId) {
      cancelAnimationFrame(circle.__animationId);
      circle.__animationId = null;
      circle.setOptions({ fillOpacity: 0.15 });
    }
  }

  useEffect(() => {
    if (!map || !window.kakao || !blackMarkerImage || !blueMarkerImage) return;

    // 기존 마커/원 제거
    markerMap.current.forEach((marker) => marker.setMap(null));
    circleMap.current.forEach((circle) => circle.setMap(null));
    markerMap.current.clear();
    circleMap.current.clear();

    farmlands.forEach((farm) => {
      const position = new window.kakao.maps.LatLng(farm.lat, farm.lng);

      // 마커 생성
      const marker = new window.kakao.maps.Marker({
        map,
        position,
        title: farm.name,
        image: blackMarkerImage,
      });

      window.kakao.maps.event.addListener(marker, "click", () => {
        onSelect(farm);
        setActiveId(farm.id);

        // 모든 원 애니메이션 정지
        circleMap.current.forEach((c) => stopCircleAnimation(c));

        // 클릭된 원에 애니메이션 적용
        const clickedCircle = circleMap.current.get(farm.id);
        animateCirclePulseInfinite(clickedCircle);
      });

      markerMap.current.set(farm.id, marker);

      // 원 생성 (면적 기반)
      const radius = Math.sqrt(farm.area) * 10;
      const circle = new window.kakao.maps.Circle({
        center: position,
        radius,
        strokeWeight: 1,
        strokeColor: "#3399ff",
        strokeOpacity: 0.6,
        strokeStyle: "solid",
        fillColor: "#3399ff",
        fillOpacity: 0.15,
        zIndex: 0,
      });
      circle.setMap(map);
      circle.__baseRadius = radius;
      circleMap.current.set(farm.id, circle);

      // 이모지 오버레이
      const emojiContent = document.createElement("div");
      emojiContent.className = "useMakerManager-emoji-overlay";
      emojiContent.innerText = farm.emoji;

      const emojiOverlay = new window.kakao.maps.CustomOverlay({
        content: emojiContent,
        position: position,
        xAnchor: 0.5,
        yAnchor: 0,
        zIndex: 1,
      });
      emojiOverlay.setMap(map);
    });
  }, [map, farmlands]);

  // ✅ 마커 색상 업데이트
  useEffect(() => {
    if (!map) return;
    markerMap.current.forEach((marker, id) => {
      marker.setImage(id === activeId ? blueMarkerImage : blackMarkerImage);
    });
  }, [activeId]);

  // ✅ 외부에서 농지 선택 → 포커싱
  const focusOnFarm = (farm) => {
    if (!map || !farm) return;
    const marker = markerMap.current.get(farm.id);
    if (!marker) return;

    setActiveId(farm.id);

    // 모든 원 애니메이션 정지
    circleMap.current.forEach((c) => stopCircleAnimation(c));
    const circle = circleMap.current.get(farm.id);
    animateCirclePulseInfinite(circle);

    const target = marker.getPosition();
    map.setLevel(4);
    setTimeout(() => {
      map.panTo(target);
    }, 100);
  };

  return { focusOnFarm };
}
