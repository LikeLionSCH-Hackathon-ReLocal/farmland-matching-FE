// components/Setting/FarmlandMatchingSetting/FarmlandList.jsx
import React from "react";

export default function FarmlandList() {
  // 실제 데이터는 props나 상태로 받아올 수 있음
  const dummyFarmlands = [
    {
      id: 1,
      image: "/images/farm1.jpg",
      address: "충남 아산시 도고면",
      crop: "벼",
      area: "1.2ha",
      date: "2025-08-01",
    },
    {
      id: 2,
      image: "/images/farm2.jpg",
      address: "충남 아산시 음봉면",
      crop: "토마토",
      area: "0.9ha",
      date: "2025-08-02",
    },
  ];

  return (
    <div className="FarmlandListWrapper">
      <div className="FarmlandSlider">
        {dummyFarmlands.map((land) => (
          <div className="FarmlandCard" key={land.id}>
            <img src={land.image} alt="농지 이미지" className="LandImage" />
            <div className="LandInfo">
              <p>주소: {land.address}</p>
              <p>작물: {land.crop}</p>
              <p>면적: {land.area}</p>
              <p>등록일: {land.date}</p>
            </div>
            <div className="LandButtons">
              <button className="detail">상세 보기</button>
              <button className="edit">수정</button>
              <button className="delete">삭제</button>
            </div>
          </div>
        ))}
      </div>
      {/* 페이지네이션 대체 (1 / 3) 등 가능 */}
    </div>
  );
}
