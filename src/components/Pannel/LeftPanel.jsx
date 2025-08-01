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
    <div className="LeftContainer">
      {/* 검색창 */}
      <input
        className="SearchInput"
        placeholder={`${filterKey} 검색`}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      {/* 필터 버튼 */}
      <div className="FilterBar">
        {filterOptions.map((key) => (
          <button
            key={key}
            className={`FilterButton ${filterKey === key ? "active" : ""}`}
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
        <button className="FilterButton">★</button>
      </div>

      {/* 농지 목록 */}
      <div className="FarmlandList">
        {filteredFarmlands.map((farm) => (
          <div
            key={farm.id}
            className="FarmlandCard"
            onClick={() => onSelect(farm)}
          >
            <div className="FarmlandImage" />
            <div className="FarmlandContent">
              <div className="FarmlandTitle">
                <div className="FarmlandTag">{farm.crop}</div>
                <div className="FarmlandName">{farm.name}</div>
              </div>
              <div className="FarmlandMeta">
                📍 {farm.address} <br />
                📐 {farm.area}㎡ / 💰 {farm.price}만원
              </div>
            </div>
            <div className="FarmlandArrow">➤</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LeftPanel;
