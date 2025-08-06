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
    <div className="TrustScore-container">
      <div className="TrustScore-title">{userName} 의 신뢰 레벨</div>

      <div className="TrustScore-bar-wrapper">
        <div className="TrustScore-bar-background">
          <div
            className="TrustScore-bar-foreground"
            style={{ width: `${(average / 100) * 100}%` }}
          ></div>
          <div className="TrustScore-marker" style={{ left: `${(average / 100) * 100}%` }}>
            <div className="TrustScore-marker-name">{userName}</div>
          </div>
        </div>
        <div className="TrustScore-score-display">{average} 점</div>
      </div>

      <div className="TrustScore-score-table">
        <div className="TrustScore-row header">
          <div className="TrustScore-cell label"></div>
          {categories.map((cat, i) => (
            <div className="TrustScore-cell category" key={i}>
              {cat}
            </div>
          ))}
          <div className="TrustScore-cell category">평균</div>
        </div>

        <div className="TrustScore-row">
          <div className="TrustScore-cell label user-name">{userName}</div>
          {userScores.map((score, i) => (
            <div className="TrustScore-cell score user" key={i}>
              {score}점
            </div>
          ))}
          <div className="TrustScore-cell score user">{average}점</div>
        </div>

        <div className="TrustScore-row">
          <div className="TrustScore-cell label avg">평균</div>
          {avgScores.map((score, i) => (
            <div className="TrustScore-cell score avg" key={i}>
              {score}점
            </div>
          ))}
          <div className="TrustScore-cell score avg">
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
