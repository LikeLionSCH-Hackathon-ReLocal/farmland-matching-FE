import { useState } from "react";
import "./LeftPanel.css";


function LeftPanel({ farmlands, onSelect }) {
  const [searchText, setSearchText] = useState("");
  const [filterKey, setFilterKey] = useState("address");

  const filterOptions = ["address", "crop", "area", "price"];

  // 필터링된 목록 반환
  const filteredFarmlands = farmlands.filter((farm) => {
    const value = farm[filterKey];
    if (filterKey === "area" || filterKey === "price") {
      const num = parseInt(searchText);
      return isNaN(num) || value >= num;
    }
    return value.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <div className="LeftPanel-LeftContainer">
      {/* 검색창 */}
      <div className="LeftPanel-LeftHeader">
        <input
          className="LeftPanel-SearchInput"
          placeholder={`${filterKey} 검색`}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        {/* 필터 버튼 */}
        <div className="LeftPanel-FilterBar">
          {filterOptions.map((key) => (
            <button
              key={key}
              className={`LeftPanel-FilterButton ${filterKey === key ? "active" : ""}`}
              onClick={() => {
                setFilterKey(key);
                setSearchText(""); // 필터 바꾸면 검색 초기화
              }}
            >
              {key === "address"
                ? "주소"
                : key === "crop"
                ? "작물"
                : key === "area"
                ? "면적"
                : key === "price"
                ? "가격"
                : key}
            </button>
          ))}
          <button className="LeftPanel-FilterButton">★</button>
        </div>{" "}
      </div>

      {/* 농지 목록 */}
      <div className="LeftPanel-FarmlandList">
        {filteredFarmlands.map((farm) => (
          <div
            key={farm.id}
            className="LeftPanel-FarmlandCard"
            onClick={() => onSelect(farm)}
          >
            <div className="LeftPanel-FarmlandImage" />
            <div className="LeftPanel-FarmlandContent">
              <div className="LeftPanel-FarmlandTitle">
                <div className="LeftPanel-FarmlandTag">{farm.crop}</div>
                <div className="LeftPanel-Left-FarmlandName">{farm.name}</div>
              </div>
              <div className="LeftPanel-FarmlandMeta">
                📍 {farm.address} <br />
                📐 {farm.area}㎡ / 💰 {farm.price}만원
              </div>
            </div>
            <div className="LeftPanel-FarmlandArrow">➤</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LeftPanel;
