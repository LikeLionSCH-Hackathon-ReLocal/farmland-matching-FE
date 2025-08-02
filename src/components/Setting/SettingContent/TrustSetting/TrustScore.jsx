import React from "react";
import "./TrustScore.css";

export default function TrustScore() {
  const categories = ["자격증", "수상", "동기", "경험"];
  const userScores = [88, 82, 78, 80];
  const avgScores = [64, 60, 62, 66];
  const userName = "'김철수' 님";

  const average = (
    userScores.reduce((sum, s) => sum + s, 0) / userScores.length
  ).toFixed(1);

  return (
    <div className="trust-container">
      <div className="title">{userName} 의 신뢰 레벨</div>

      <div className="bar-wrapper">
        <div className="bar-background">
          <div
            className="bar-foreground"
            style={{ width: `${(average / 100) * 100}%` }}
          ></div>
          <div className="marker" style={{ left: `${(average / 100) * 100}%` }}>
            <div className="marker-name">{userName}</div>
          </div>
        </div>
        <div className="score-display">{average} 점</div>
      </div>

      <div className="score-table">
        <div className="row header">
          <div className="cell label"></div>
          {categories.map((cat, i) => (
            <div className="cell category" key={i}>
              {cat}
            </div>
          ))}
          <div className="cell category">평균</div>
        </div>

        <div className="row">
          <div className="cell label user-name">{userName}</div>
          {userScores.map((score, i) => (
            <div className="cell score user" key={i}>
              {score}점
            </div>
          ))}
          <div className="cell score user">{average}점</div>
        </div>

        <div className="row">
          <div className="cell label avg">평균</div>
          {avgScores.map((score, i) => (
            <div className="cell score avg" key={i}>
              {score}점
            </div>
          ))}
          <div className="cell score avg">
            {Math.round(
              avgScores.reduce((sum, s) => sum + s, 0) / avgScores.length
            )}
            점
          </div>
        </div>
      </div>
    </div>
  );
}
