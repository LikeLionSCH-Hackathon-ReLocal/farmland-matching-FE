import React, { useState } from "react";
import "./Purchase.css";
import UserDetail from "./UserDetail";

const Purchase = () => {
  const users = [
    {
      name: "김광우",
      age: 27,
      gender: "남",
      address: "경기도 고양시 asdasdfafaga",
      phone: "010 - 2384 - 4320",
      intro: "열심히 배우고, 미래를 준비하며 귀농을 꿈꿉니다.",
      awards: ["스마트팜 관련 교육 수료", "농업기술센터 교육 수료"],
      skills: ["SNS 마케팅", "드론 방제", "토양 관리"],
      crops: ["딸기", "상추"],
      farmingExp: "도시농업 경진대회 참가 / 작물 재배 2년",
      youtube: "https://www.youtube.com",
    },
    // ... 다른 유저들 추가
  ];

  const [selectedUser, setSelectedUser] = useState(null);

  if (selectedUser) {
    return <UserDetail user={selectedUser} onClose={() => setSelectedUser(null)} />;
  }

  return (
    <div className="Purchase-container">
      <div className="Purchase-wrapper">
        {users.map((user, index) => (
          <div key={index} className="Purchase-card">
            <div className="info-row"><label>이름</label><input type="text" value={user.name} readOnly /></div>
            <div className="info-row"><label>나이</label><input type="text" value={user.age} readOnly /></div>
            <div className="info-row"><label>성별</label><input type="text" value={user.gender} readOnly /></div>
            <div className="info-row"><label>거주지</label><input type="text" value={user.address} readOnly /></div>
            <div className="info-row"><label>연락처</label><input type="text" value={user.phone} readOnly /></div>
            <div className="btn-group">
              <button className="btn match">매칭</button>
              <button className="btn detail" onClick={() => setSelectedUser(user)}>상세 정보</button>
              <button className="btn reject">거절</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Purchase;
