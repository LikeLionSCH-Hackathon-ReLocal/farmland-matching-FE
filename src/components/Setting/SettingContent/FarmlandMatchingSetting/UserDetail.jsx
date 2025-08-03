import React from "react";
import "./UserDetail.css";

export default function UserDetail({ user, onClose }) {
  return (
    <div className="detail-container">
      <div className="detail-header">
        <h2>상세 정보</h2>
        <button className="close-btn" onClick={onClose}>X</button>
      </div>
      <div className="detail-body">
        <div className="detail-left">
          <img
            src="https://via.placeholder.com/150"
            alt="프로필"
            className="profile-image"
          />
          <div className="tag-list">
            {user.awards?.map((award, i) => (
              <span key={i} className="tag">{award}</span>
            ))}
          </div>
        </div>

        <div className="detail-right">
          <div className="row">
            <div><strong>이름:</strong> {user.name}</div>
            <div><strong>나이:</strong> {user.age}</div>
            <div><strong>성별:</strong> {user.gender}</div>
            <div><strong>거주지:</strong> {user.address}</div>
            <div><strong>연락처:</strong> {user.phone}</div>
          </div>

          <div className="section">
            <h3>자기 소개</h3>
            <p>{user.intro}</p>
          </div>

          <div className="section">
            <h3>관련 활동 / 관심 분야</h3>
            <p>{user.farmingExp}</p>
          </div>

          <div className="section">
            <h3>기술 · 장비</h3>
            <ul>
              {user.skills?.map((skill, i) => <li key={i}>{skill}</li>)}
            </ul>
          </div>

          <div className="section">
            <h3>희망 작물</h3>
            <p>{user.crops?.join(", ")}</p>
          </div>

          <div className="section">
            <h3>자기소개 영상</h3>
            <a href={user.youtube} target="_blank" rel="noreferrer">{user.youtube}</a>
          </div>
        </div>
      </div>
    </div>
  );
}
