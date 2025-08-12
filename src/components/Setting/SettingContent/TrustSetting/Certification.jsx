import { useEffect, useMemo, useState } from "react";
import "./Certification.css";

/**
 * props
 * - user: YoungUser 객체(SettingModal에서 내려줌)
 * - onUserChange(updatedUser): YoungUser 저장 콜백
 * - data, updateData, onSubmit: 기존 Certification 폼(유지)
 */
export default function Certification({ user, onUserChange, data, updateData, onSubmit }) {
  // 자격증/작물/장비/거래/한마디
  const [certificates, setCertificates] = useState([]); // [{ name, file }]
  const [crops, setCrops] = useState([]);               // [string]
  const [tools, setTools] = useState([]);               // [string]
  const [trades, setTrades] = useState([]);             // [string]
  const [leasePeriod, setLeasePeriod] = useState("");
  const [otherTrade, setOtherTrade] = useState("");
  const [comment, setComment] = useState("");

  // ✅ 수상 경력
  const [awards, setAwards] = useState([]);             // [{ title, org, year }]

  const tradeOptions = ["토지 매입", "임대", "공유농", "기타"];

  // YoungUser → 초기값 주입
  useEffect(() => {
    if (!user) return;

    // 자격증(object → list)
    const certObj = user.detail?.certification || {};
    const certNames = Object.values(certObj).filter(Boolean);
    setCertificates(certNames.map((n) => ({ name: n, file: null })));

    // 관심 작물/장비(object → list)
    setCrops(Object.values(user.detail?.interest || {}).filter(Boolean));
    setTools(Object.values(user.detail?.equipment || {}).filter(Boolean));

    // 거래(object → list)
    setTrades(Object.values(user.detail?.trade || {}).filter(Boolean));

    // 소개
    setComment(user.detail?.intro?.OneWord || "");

    // 확장 필드
    setLeasePeriod(user.detail?.leasePeriod || "");
    setOtherTrade(user.detail?.otherTrade || "");

    // ✅ 수상 경력: detail.win(object) → awards list
    const winObj = user.detail?.win || {};
    const winList = Object.values(winObj).filter(Boolean);
    // 기본적으로 title에 문자열을 넣고 org/year는 빈칸으로 시작
    setAwards(winList.map((title) => ({ title, org: "", year: "" })));
  }, [user]);

  // 공용 유틸
  const handleDynamicChange = (setter, index, value) => {
    setter((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };
  const addDynamicField = (setter, initial = "") => setter((prev) => [...prev, initial]);
  const removeAt = (setter, index) => setter((prev) => prev.filter((_, i) => i !== index));

  const handleCertChange = (idx, field, value) => {
    setCertificates((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], [field]: value };
      return next;
    });
  };

  // ✅ awards 필드 변경
  const handleAwardChange = (idx, field, value) => {
    setAwards((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], [field]: value };
      return next;
    });
  };

  const toggleTrade = (type) => {
    setTrades((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]));
  };

  const canSave = useMemo(() => {
    return (
      certificates.some((c) => c.name?.trim()) ||
      crops.some((c) => c?.trim()) ||
      tools.some((t) => t?.trim()) ||
      trades.length > 0 ||
      comment.trim() ||
      awards.some((a) => a.title?.trim() || a.org?.trim() || a.year?.trim())
    );
  }, [certificates, crops, tools, trades, comment, awards]);

  // 저장
  const handleSaveAll = () => {
    if (!user) return;

    const updated = {
      ...user,
      detail: {
        ...user.detail,
        intro: { ...user.detail?.intro, OneWord: comment },
        // list 필드(다른 화면에서 쓰기 편함)
        certificationList: certificates.map((c) => c.name).filter(Boolean),
        interestList: crops.filter(Boolean),
        equipmentList: tools.filter(Boolean),
        tradesList: trades,
        leasePeriod,
        otherTrade,
        // ✅ 수상 경력 리스트 저장
        awardsList: awards
          .filter((a) => a.title?.trim() || a.org?.trim() || a.year?.trim())
          .map((a) => ({ title: a.title?.trim() || "", org: a.org?.trim() || "", year: a.year?.trim() || "" })),
      },
    };

    onUserChange?.(updated);

    // 기존 상위 폼도 동기화(있으면)
    if (typeof updateData === "function") {
      updateData("certificates", certificates);
      updateData("crops", crops.filter(Boolean));
      updateData("tools", tools.filter(Boolean));
      updateData("trades", trades);
      updateData("leasePeriod", leasePeriod);
      updateData("otherTrade", otherTrade);
      updateData("comment", comment);
      // ✅ awards도 함께
      updateData("awards", updated.detail.awardsList);
    }

    if (typeof onSubmit === "function") onSubmit();

    alert("신뢰 프로필이 저장되었습니다.");
    console.log("✅ Saved(user):", updated);
  };

  return (
    <div className="Certification-Container">
      <div className="Certification-Header">
        <h2>신뢰 프로필 관리</h2>
        <p>자격증 / 관심 작물 / 사용 장비 / 거래 형태 / 수상 경력 / 한마디 소개</p>
      </div>

      {/* 자격증 */}
      <section className="Certification-Card">
        <div className="Certification-CardHeader">
          <h3>자격증</h3>
          <button className="Certification-AddButton" onClick={() => addDynamicField(setCertificates, { name: "", file: null })}>
            + 추가
          </button>
        </div>
        {certificates.length === 0 && <div className="Certification-Empty">자격증을 추가해 주세요.</div>}
        {certificates.map((cert, index) => (
          <div className="Certification-RowGrid" key={index}>
            <input
              type="text"
              placeholder="자격증 이름"
              value={cert.name}
              onChange={(e) => handleCertChange(index, "name", e.target.value)}
              className="Certification-Input"
            />
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => handleCertChange(index, "file", e.target.files?.[0] || null)}
              className="Certification-Input"
            />
            <button className="Certification-DeleteButton" onClick={() => removeAt(setCertificates, index)}>
              삭제
            </button>
          </div>
        ))}
      </section>

      {/* 관심 작물 */}
      <section className="Certification-Card">
        <div className="Certification-CardHeader">
          <h3>관심 작물</h3>
          <button className="Certification-AddButton" onClick={() => addDynamicField(setCrops)}>
            + 추가
          </button>
        </div>
        {crops.length === 0 && <div className="Certification-Empty">관심 작물을 추가해 주세요.</div>}
        {crops.map((crop, index) => (
          <div className="Certification-RowGrid" key={index}>
            <input
              type="text"
              placeholder="예: 사과"
              value={crop}
              onChange={(e) => handleDynamicChange(setCrops, index, e.target.value)}
              className="Certification-Input"
            />
            <div></div>
            <button className="Certification-DeleteButton" onClick={() => removeAt(setCrops, index)}>
              삭제
            </button>
          </div>
        ))}
      </section>

      {/* 사용 장비 */}
      <section className="Certification-Card">
        <div className="Certification-CardHeader">
          <h3>사용 장비</h3>
          <button className="Certification-AddButton" onClick={() => addDynamicField(setTools)}>
            + 추가
          </button>
        </div>
        {tools.length === 0 && <div className="Certification-Empty">사용 장비를 추가해 주세요.</div>}
        {tools.map((tool, index) => (
          <div className="Certification-RowGrid" key={index}>
            <input
              type="text"
              placeholder="예: 트랙터"
              value={tool}
              onChange={(e) => handleDynamicChange(setTools, index, e.target.value)}
              className="Certification-Input"
            />
            <div></div>
            <button className="Certification-DeleteButton" onClick={() => removeAt(setTools, index)}>
              삭제
            </button>
          </div>
        ))}
      </section>

      {/* 거래 형태 */}
      <section className="Certification-Card">
        <h3>거래 형태</h3>
        <div className="Certification-TagContainer">
          {tradeOptions.map((type) => (
            <button
              key={type}
              type="button"
              className={`Certification-TagButton ${trades.includes(type) ? "selected" : ""}`}
              onClick={() => toggleTrade(type)}
            >
              {type}
            </button>
          ))}
        </div>

        {trades.includes("임대") && (
          <input
            type="text"
            placeholder="임대 기간 (예: 2년)"
            value={leasePeriod}
            onChange={(e) => setLeasePeriod(e.target.value)}
            className="Certification-Input mt-8"
          />
        )}
        {trades.includes("기타") && (
          <input
            type="text"
            placeholder="기타 거래 형태를 입력해주세요"
            value={otherTrade}
            onChange={(e) => setOtherTrade(e.target.value)}
            className="Certification-Input mt-8"
          />
        )}
      </section>

      {/* ✅ 수상 경력 */}
      <section className="Certification-Card">
        <div className="Certification-CardHeader">
          <h3>수상 경력</h3>
          <button
            className="Certification-AddButton"
            onClick={() => setAwards((prev) => [...prev, { title: "", org: "", year: "" }])}
          >
            + 추가
          </button>
        </div>

        {awards.length === 0 && <div className="Certification-Empty">수상 경력을 추가해 주세요.</div>}

        {awards.map((a, idx) => (
          <div className="Certification-RowGrid awards" key={idx}>
            <input
              className="Certification-Input"
              type="text"
              placeholder="수상명 (예: 귀농 창업 경진대회 최우수)"
              value={a.title}
              onChange={(e) => handleAwardChange(idx, "title", e.target.value)}
            />
            <input
              className="Certification-Input"
              type="text"
              placeholder="수여기관 (예: 농림축산식품부)"
              value={a.org}
              onChange={(e) => handleAwardChange(idx, "org", e.target.value)}
            />
            <input
              className="Certification-Input"
              type="text"
              placeholder="연도 (예: 2024)"
              value={a.year}
              onChange={(e) => handleAwardChange(idx, "year", e.target.value)}
            />
            <button className="Certification-DeleteButton" onClick={() => removeAt(setAwards, idx)}>
              삭제
            </button>
          </div>
        ))}
      </section>


      <div className="Certification-ActionRow">
        <button className="Certification-PrimaryButton" disabled={!canSave} onClick={handleSaveAll}>
          저장
        </button>
      </div>
    </div>
  );
}
