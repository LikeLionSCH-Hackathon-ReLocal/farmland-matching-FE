import React, { useState } from "react";
import "./Sell.css";

const Sell = () => {
  const users = [
    {
      name: "김광우",
      age: 27,
      gender: "남",
      address: "경기도 고양시 asdasdfafaga",
      phone: "010 - 2384 - 4320",
    },
    {
      name: "신영만",
      age: 59,
      gender: "남",
      address: "충청남도 아산시 asdasdfga",
      phone: "010 - 2144 - 6757",
    },
    {
      name: "황이석",
      age: 62,
      gender: "남",
      address: "충청북도 진천시 asfafaf",
      phone: "010 - 5435 - 6575",
    },
    // 추가 사용자 데이터 가능
  ];

  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = users.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="Sell-container">
      <div className="Sell-wrapper">
        {currentUsers.map((user, index) => (
          <div key={index} className="Sell-card">
            <div className="info-row">
              <label>주소</label>
              <input type="text" value={user.name} readOnly />
            </div>
            <div className="info-row">
              <label>작물</label>
              <input type="text" value={user.age} readOnly />
            </div>
            <div className="info-row">
              <label>등록일</label>
              <input type="text" value={user.gender} readOnly />
            </div>
            <div className="info-row">
              <label>매칭 상대</label>
              <input type="text" value={user.address} readOnly />
            </div>
            <div className="info-row">
              <label>예상수익</label>
              <input type="text" value={user.phone} readOnly />
            </div>
            <div className="btn-group">
              <button className="btn match">매칭</button>
              <button className="btn detail">상세 정보</button>
              <button className="btn reject">거절</button>
            </div>
          </div>
        ))}
      </div>
      <div className="Sell-controls">
        <button onClick={handlePrev} disabled={currentPage === 1}>&lt;</button>
        <span>{` ${currentPage} / ${totalPages} `}</span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>&gt;</button>
      </div>
    </div>
  );
};

export default Sell;
