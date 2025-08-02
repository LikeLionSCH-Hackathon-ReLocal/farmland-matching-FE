import { useState } from "react";
import FarmlandList from "./FarmlandList";
import FarmlandRegister from "./FarmlandRegister";

export default function FarmlandManage() {
  const [tab, setTab] = useState("list"); // list or register

  return (
    <div className="FarmlandManageContainer">
      <div className="TabMenu">
        <button
          className={tab === "list" ? "active" : ""}
          onClick={() => setTab("list")}
        >
          농지 목록
        </button>
        <button
          className={tab === "register" ? "active" : ""}
          onClick={() => setTab("register")}
        >
          농지 등록
        </button>
      </div>

      <div className="TabContent">
        {tab === "list" ? <FarmlandList /> : <FarmlandRegister />}
      </div>
    </div>
  );
}
