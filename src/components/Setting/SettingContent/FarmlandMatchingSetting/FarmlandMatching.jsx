import { useState } from "react";
import Purchase from "./Purchase";
import Sell from "./Sell";

export default function FarmlandMatching() {
  const [tab, setTab] = useState("buy"); 

  return (
    <div className="FarmlandMatchingContainer">
      <div className="TabMenu">
        <button
          className={tab === "buy" ? "active" : ""}
          onClick={() => setTab("buy")}
        >
          구매자
        </button>
        <button
          className={tab === "sell" ? "active" : ""}
          onClick={() => setTab("sell")}
        >
          판매자
        </button>
      </div>

      <div className="TabContent">
        {tab === "buy" ? <Purchase /> : <Sell />}
      </div>
    </div>
  );
}
