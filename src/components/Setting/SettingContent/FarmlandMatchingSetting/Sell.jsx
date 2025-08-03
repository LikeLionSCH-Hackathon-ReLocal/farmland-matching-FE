import React, { useState } from "react";
import "./Sell.css";

const Sell = () => {
  const users = [
    {
      image: "/images/farm1.jpg",
      address: "충청남도 아산시 어쩌고 저쩌고",
      crop: "배",
      date: "2025-07-19",
      status: "대기 중",
      profit: "모름",
    },
    {
      image: "/images/farm2.jpg",
      address: "충청남도 아산시 어쩌고 저쩌고",
      crop: "배",
      date: "2025-07-01",
      status: "매칭 실패",
      profit: "모름",
    },
    {
      image: "/images/farm3.jpg",
      address: "충청남도 아산시 어쩌고 저쩌고",
      crop: "사과",
      date: "2025-05-07",
      status: "매칭 성공",
      profit: "모름",
    },
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
            <img src={user.image} alt="farm" className="farm-image" />
            <div className="info-row">
              <label>주소</label>
              <input type="text" value={user.address} readOnly />
            </div>
            <div className="info-row">
              <label>작물</label>
              <input type="text" value={user.crop} readOnly />
            </div>
            <div className="info-row">
              <label>등록일</label>
              <input type="text" value={user.date} readOnly />
            </div>
            <div className="info-row">
              <label>매칭 상태</label>
              <input type="text" value={user.status} readOnly />
            </div>
            <div className="info-row">
              <label>예상 수익</label>
              <input type="text" value={user.profit} readOnly />
            </div>
            <div className="btn-group">
              <button className="btn detail">상세 보기</button>
              <button className="btn match">수락</button>
              <button className="btn reject">삭제</button>
            </div>
          </div>
        ))}
      </div>
      <div className="Sell-controls">
        <button onClick={handlePrev} disabled={currentPage === 1}>
          &lt;
        </button>
        <span>{` ${currentPage} / ${totalPages} `}</span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Sell;
