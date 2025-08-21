// src/lib/useKakaoLoader.js
import { useEffect, useState } from "react";

export default function useKakaoLoader(appKey) {
  const [loaded, setLoaded] = useState(!!window.kakao?.maps);

  useEffect(() => {
    if (loaded) return;
    if (!appKey) {
      console.warn("[useKakaoLoader] REACT_APP_KAKAO_JAVASCRIPT_KEY 누락");
      return;
    }

    const id = "kakao-map-sdk";
    if (document.getElementById(id)) return;

    const script = document.createElement("script");
    script.id = id;
    script.async = true;
    script.src =
      `//dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false&libraries=services`;
    script.onload = () => {
      window.kakao.maps.load(() => setLoaded(true));
    };
    document.head.appendChild(script);
  }, [appKey, loaded]);

  return loaded;
}
