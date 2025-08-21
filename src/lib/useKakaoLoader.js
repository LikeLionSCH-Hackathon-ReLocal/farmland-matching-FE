// src/lib/useKakaoLoader.js
import { useEffect, useState } from "react";

export default function useKakaoLoader(appKey) {
  const [loaded, setLoaded] = useState(
    !!(window.kakao?.maps && window.kakao?.maps?.services)
  );

  useEffect(() => {
    if (!appKey) {
      console.warn("[useKakaoLoader] REACT_APP_KAKAO_JAVASCRIPT_KEY 누락");
      return;
    }

    // 이미 모두 준비된 경우
    if (window.kakao?.maps?.services) {
      setLoaded(true);
      return;
    }

    const ID = "kakao-map-sdk";
    const desiredSrc =
      `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}` +
      `&autoload=false&libraries=services`;

    const exists = document.getElementById(ID);
    if (exists) {
      // 기존 스크립트가 services 없이 로드됐으면 교체
      const hasServices = exists.src.includes("libraries=services");
      if (!hasServices) {
        console.warn("[useKakaoLoader] 기존 SDK에 services 미포함 → 교체");
        exists.remove();
      } else {
        // 같은 스크립트면 그냥 load만 호출해도 됨
        try {
          window.kakao?.maps?.load?.(() => {
            if (window.kakao?.maps?.services) setLoaded(true);
          });
          return;
        } catch (e) {
          console.warn("[useKakaoLoader] maps.load 호출 중 경고:", e);
        }
      }
    }

    // 새로 주입
    const script = document.createElement("script");
    script.id = ID;
    script.async = true;
    script.src = desiredSrc;
    script.onload = () => {
      try {
        window.kakao.maps.load(() => {
          if (!window.kakao?.maps?.services) {
            console.error("[useKakaoLoader] services 라이브러리 없음");
            return;
          }
          setLoaded(true);
        });
      } catch (e) {
        console.error("[useKakaoLoader] onload 처리 중 오류:", e);
      }
    };
    script.onerror = () => {
      console.error("[useKakaoLoader] SDK 스크립트 로드 실패");
    };
    document.head.appendChild(script);
  }, [appKey]);

  return loaded;
}
