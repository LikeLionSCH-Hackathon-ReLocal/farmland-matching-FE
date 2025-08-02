import { useState } from "react";
import Star from "./Star";

export default function FarmlandMatching() {
  const [tab, setTab] = useState("star"); // 초기값도 "buy"로

  return (
    <div className="FarmlandMatchingContainer">
      <div className="TabMenu">
        <button
          className={tab === "star" ? "active" : ""}
          onClick={() => setTab("star")}
        >
          관심 농장 목록
        </button>
      </div>

      <div className="TabContent">
        {tab === "star" ? <Star /> : <Star />}
      </div>
    </div>
  );
}
