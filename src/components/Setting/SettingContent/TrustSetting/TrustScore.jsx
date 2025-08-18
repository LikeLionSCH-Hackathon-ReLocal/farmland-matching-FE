import React, { useMemo } from "react";
import "./TrustScore.css";

export default function TrustScore({ user }) {
  const detail = user?.detail || {};

  const certs = detail.certificationList?.length
    ? detail.certificationList
    : Object.values(detail.certification || {}).filter(Boolean);

  const awards = detail.awardsList?.length
    ? detail.awardsList
    : Object.values(detail.win || {}).filter(Boolean).map(t => ({ title: t }));

  const recommenders = detail.recommendersList?.length
    ? detail.recommendersList
    : [detail.recommand1, detail.recommand2, detail.recommand3].filter(Boolean);

  const RULE = {
    CERT_PER: 5,
    AWARD_PER: 7,
    INTRO_ONEWORD: 3,
    INTRO_BODY: 5,
    INTRO_SNS: 2,
    RECOMM_PER: 4,
  };

  const total = useMemo(() => {
    let s = 0;
    s += (certs?.length || 0) * RULE.CERT_PER;
    s += (awards?.length || 0) * RULE.AWARD_PER;
    if (detail.intro?.OneWord) s += RULE.INTRO_ONEWORD;
    if (detail.intro?.PullWord) s += RULE.INTRO_BODY;
    if (detail.intro?.sns) s += RULE.INTRO_SNS;
    s += (recommenders?.length || 0) * RULE.RECOMM_PER;
    return s;
  }, [certs, awards, recommenders, detail]);

  const rows = [
    { icon: "📜", label: "자격증", rule: `1개당 +${RULE.CERT_PER}점`, qty: `${certs.length}개`, score: certs.length * RULE.CERT_PER },
    { icon: "🏆", label: "수상 경력", rule: `1개당 +${RULE.AWARD_PER}점`, qty: `${awards.length}개`, score: awards.length * RULE.AWARD_PER },
    { icon: "💬", label: "대표 한마디", rule: `작성 시 +${RULE.INTRO_ONEWORD}점`, qty: detail.intro?.OneWord ? "O" : "X", score: detail.intro?.OneWord ? RULE.INTRO_ONEWORD : 0 },
    { icon: "📝", label: "자기소개 본문", rule: `작성 시 +${RULE.INTRO_BODY}점`, qty: detail.intro?.PullWord ? "O" : "X", score: detail.intro?.PullWord ? RULE.INTRO_BODY : 0 },
    { icon: "🔗", label: "SNS", rule: `등록 시 +${RULE.INTRO_SNS}점`, qty: detail.intro?.sns ? "O" : "X", score: detail.intro?.sns ? RULE.INTRO_SNS : 0 },
    { icon: "🤝", label: "추천인", rule: `1명당 +${RULE.RECOMM_PER}점`, qty: `${recommenders.length}명`, score: recommenders.length * RULE.RECOMM_PER },
  ];

  return (
    <div className="TrustScore-container">
      <div className="RecommenderForm-description">
        신뢰 점수는 <strong>자격증, 수상경력, 대표 한마디, 자기소개 본문, SNS, 추천인</strong> 등으로 점수가 매겨지며{" "}
        <strong>판매자에게 점수가 제공됩니다.</strong> 판매자에게 <strong>신뢰</strong> 할 수 있는 사람이라는 것을 증명해줄 수 있는 점수 입니다.
      </div>
      <div className="TrustScore-title">{user?.name || "사용자"} 의 신뢰 점수</div>

      <div className="TrustScore-bar-wrapper">
        <div className="TrustScore-bar-background">
          <div
            className="TrustScore-bar-foreground"
            style={{ width: `${Math.min(total, 100)}%` }}
          />
        </div>
        <div className="TrustScore-score-display">{total} 점</div>
      </div>

      <table className="TrustScore-table">
        <thead>
          <tr>
            <th>항목</th>
            <th>기준</th>
            <th>수량/여부</th>
            <th>획득 점수</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td className="label"><span className="icon">{r.icon}</span>{r.label}</td>
              <td>{r.rule}</td>
              <td>{r.qty}</td>
              <td className="score">{r.score}점</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
