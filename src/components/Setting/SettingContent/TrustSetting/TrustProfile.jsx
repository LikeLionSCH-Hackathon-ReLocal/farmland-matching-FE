// src/components/Setting/SettingContent/TrustSetting/TrustProfile.jsx
import { useEffect, useMemo, useState } from "react";
import "./TrustProfile.css";

export default function TrustProfile({ user, onUserChange }) {
  // 관심작물/장비/거래
  const [crops, setCrops] = useState([]);
  const [tools, setTools] = useState([]);
  const [trades, setTrades] = useState([]);
  const [leasePeriod, setLeasePeriod] = useState("");
  const [otherTrade, setOtherTrade] = useState("");

  // 수상경력
  const [awards, setAwards] = useState([]); // [{ title, org, year }]

  // 소개/영상/SNS/성향
  const [oneLine, setOneLine] = useState("");
  const [intro, setIntro] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [sns, setSns] = useState("");
  const [personal, setPersonal] = useState("");

  // ✅ 농업 경험
  const [hasExp, setHasExp] = useState(false);
  const [expYears, setExpYears] = useState("");
  const [expDesc, setExpDesc] = useState("");

  const tradeOptions = ["토지 매입", "임대", "공유농", "기타"];
  const ONE_LINE_MAX = 80;

  useEffect(() => {
    if (!user) return;

    // 관심작물/장비: object 또는 list 호환
    const interestList = Object.values(user.detail?.interest || {}).filter(Boolean);
    const equipmentList = Object.values(user.detail?.equipment || {}).filter(Boolean);
    setCrops(interestList.length ? interestList : user.detail?.interestList || []);
    setTools(equipmentList.length ? equipmentList : user.detail?.equipmentList || []);

    // 거래: object 또는 list 호환
    const tradeList = Object.values(user.detail?.trade || {}).filter(Boolean);
    setTrades(tradeList.length ? tradeList : user.detail?.tradesList || []);
    setLeasePeriod(user.detail?.leasePeriod || "");
    setOtherTrade(user.detail?.otherTrade || "");

    // 수상경력
    const winObj = user.detail?.win || {};
    const fromObj = Object.values(winObj).filter(Boolean).map((title) => ({ title, org: "", year: "" }));
    const fromList = user.detail?.awardsList || [];
    setAwards(fromList.length ? fromList : fromObj);

    // 소개 묶음
    const i = user.detail?.intro || {};
    setOneLine(i.OneWord || "");
    setIntro(i.PullWord || "");
    setVideoUrl(i.video || "");
    setSns(i.sns || "");
    setPersonal(i.personal || "");

    // ✅ 경험 로드
    const exp = user.detail?.experience || {};
    setHasExp(!!exp.has);
    setExpYears(exp.years || "");
    setExpDesc(exp.desc || "");
  }, [user]);

  // 유틸
  const addField = (setter, initial = "") => setter((prev) => [...prev, initial]);
  const removeAt = (setter, idx) => setter((prev) => prev.filter((_, i) => i !== idx));
  const changeAt = (setter, idx, val) =>
    setter((prev) => {
      const next = [...prev];
      next[idx] = val;
      return next;
    });

  const toggleTrade = (type) =>
    setTrades((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]));

  const changeAward = (idx, field, value) =>
    setAwards((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], [field]: value };
      return next;
    });

  const canSave = useMemo(() => {
    return (
      crops.some((v) => v?.trim()) ||
      tools.some((v) => v?.trim()) ||
      trades.length > 0 ||
      awards.some((a) => a.title?.trim() || a.org?.trim() || a.year?.trim()) ||
      oneLine.trim() ||
      intro.trim() ||
      videoUrl.trim() ||
      sns.trim() ||
      personal.trim() ||
      hasExp ||                      // ✅ 경험 토글 자체도 저장 요건
      (!!expYears?.trim()) ||
      (!!expDesc?.trim())
    );
  }, [crops, tools, trades, awards, oneLine, intro, videoUrl, sns, personal, hasExp, expYears, expDesc]);

  const onSave = () => {
    if (!user) return;

    const awardsList = awards
      .filter((a) => a.title?.trim() || a.org?.trim() || a.year?.trim())
      .map((a) => ({
        title: a.title?.trim() || "",
        org: a.org?.trim() || "",
        year: a.year?.trim() || "",
      }));

    const updated = {
      ...user,
      detail: {
        ...user.detail,
        interestList: crops.filter(Boolean),
        equipmentList: tools.filter(Boolean),
        tradesList: trades,
        leasePeriod,
        otherTrade,
        awardsList,
        intro: {
          ...user.detail?.intro,
          OneWord: oneLine.trim(),
          PullWord: intro.trim(),
          video: videoUrl.trim(),
          sns: sns.trim(),
          personal: personal.trim(),
        },
        // ✅ 경험 저장
        experience: {
          has: !!hasExp,
          years: (hasExp ? expYears : "").trim(),
          desc: (hasExp ? expDesc : "").trim(),
        },
      },
    };

    onUserChange?.(updated);
    alert("신뢰 프로필이 저장되었습니다.");
    console.log("✅ TrustProfile saved:", updated.detail);
  };

  return (
    <div className="TrustProfile-Container">
      <div className="TrustProfile-Header">
        <h2>신뢰 프로필</h2>
        <p>관심 작물 / 사용 장비 / 거래 형태 / 수상 경력 / 소개 · 영상 · SNS · 성향 / 농업 경험</p>
      </div>

      {/* 가로 2열 그리드 */}
      <div className="TrustProfile-Grid">
        {/* 관심 작물 */}
        <section className="TrustProfile-Card">
          <div className="TrustProfile-CardHeader">
            <h3>관심 작물</h3>
            <button className="TrustProfile-AddButton" onClick={() => addField(setCrops)}>
              + 추가
            </button>
          </div>
          {crops.length === 0 && <div className="TrustProfile-Empty">관심 작물을 추가해 주세요.</div>}
          {crops.map((crop, idx) => (
            <div className="TrustProfile-RowGrid" key={idx}>
              <input
                className="TrustProfile-Input"
                type="text"
                placeholder="예: 사과"
                value={crop}
                onChange={(e) => changeAt(setCrops, idx, e.target.value)}
              />
              <div></div>
              <button className="TrustProfile-DeleteButton" onClick={() => removeAt(setCrops, idx)}>
                삭제
              </button>
            </div>
          ))}
        </section>

        {/* 사용 장비 */}
        <section className="TrustProfile-Card">
          <div className="TrustProfile-CardHeader">
            <h3>사용 장비</h3>
            <button className="TrustProfile-AddButton" onClick={() => addField(setTools)}>
              + 추가
            </button>
          </div>
          {tools.length === 0 && <div className="TrustProfile-Empty">사용 장비를 추가해 주세요.</div>}
          {tools.map((tool, idx) => (
            <div className="TrustProfile-RowGrid" key={idx}>
              <input
                className="TrustProfile-Input"
                type="text"
                placeholder="예: 트랙터"
                value={tool}
                onChange={(e) => changeAt(setTools, idx, e.target.value)}
              />
              <div></div>
              <button className="TrustProfile-DeleteButton" onClick={() => removeAt(setTools, idx)}>
                삭제
              </button>
            </div>
          ))}
        </section>

        {/* 거래 형태 */}
        <section className="TrustProfile-Card">
          <h3>거래 형태</h3>
          <div className="TrustProfile-TagContainer">
            {tradeOptions.map((type) => (
              <button
                key={type}
                type="button"
                className={`TrustProfile-TagButton ${trades.includes(type) ? "selected" : ""}`}
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
              className="TrustProfile-Input TrustProfile-mt8"
            />
          )}
          {trades.includes("기타") && (
            <input
              type="text"
              placeholder="기타 거래 형태를 입력해주세요"
              value={otherTrade}
              onChange={(e) => setOtherTrade(e.target.value)}
              className="TrustProfile-Input TrustProfile-mt8"
            />
          )}
        </section>

        {/* 수상 경력 */}
        <section className="TrustProfile-Card">
          <div className="TrustProfile-CardHeader">
            <h3>수상 경력</h3>
            <button className="TrustProfile-AddButton" onClick={() => setAwards((prev) => [...prev, { title: "" }])}>
              + 추가
            </button>
          </div>

          {awards.length === 0 && <div className="TrustProfile-Empty">수상 경력을 추가해 주세요.</div>}

          {awards.map((a, idx) => (
            <div className="TrustProfile-RowGrid awards" key={idx}>
              <input
                className="TrustProfile-Input"
                type="text"
                placeholder="수상명 (예: 귀농 창업 경진대회 최우수)"
                value={a.title}
                onChange={(e) => changeAward(idx, "title", e.target.value)}
              />
              <button className="TrustProfile-DeleteButton" onClick={() => setAwards((prev) => prev.filter((_, i) => i !== idx))}>
                삭제
              </button>
            </div>
          ))}
        </section>

        {/* ✅ 농업 경험 */}
        <section className="TrustProfile-Card">
          <div className="TrustProfile-CardHeader">
            <h3>농업 경험</h3>
          </div>
          {hasExp && (
            <>
              <div className="TrustProfile-Row">
                <label className="TrustProfile-Label">경력 연차</label>
                <div className="TrustProfile-InputWrap">
                  <input
                    className="TrustProfile-Input"
                    placeholder="예: 2년"
                    value={expYears}
                    onChange={(e) => setExpYears(e.target.value)}
                  />
                </div>
              </div>

            </>
          )}
          {!hasExp && <div className="TrustProfile-Empty">농업 경험이 없다고 선택하셨습니다.</div>}
        </section>
      </div>

      {/* 소개 묶음 (한마디/자기소개/영상/SNS/성향) — 전체 폭 */}
      <section className="TrustProfile-IntroRoot">
        <div className="TrustProfile-IntroCard">
          <TrustRow label="한마디 소개">
            <div className="TrustProfile-InputWrap">
              <input
                className="TrustProfile-Input"
                placeholder={`예) ${ONE_LINE_MAX}자 이내로 핵심만 적어주세요`}
                value={oneLine}
                maxLength={ONE_LINE_MAX}
                onChange={(e) => setOneLine(e.target.value)}
                aria-label="대표 한마디"
              />
              <div className="TrustProfile-Counter">{oneLine.length} / {ONE_LINE_MAX}</div>
            </div>
          </TrustRow>

          <TrustRow label="자기 소개">
            <textarea
              className="TrustProfile-Textarea"
              placeholder="자기소개(필수) — 동기, 경험, 목표 등을 자세히 적어주세요."
              rows={8}
              value={intro}
              onChange={(e) => setIntro(e.target.value)}
              aria-label="자기 소개"
            />
          </TrustRow>

          <TrustRow label="자기소개 영상">
            <input
              type="text"
              className="TrustProfile-Input"
              placeholder="YouTube 등 영상 URL (선택)"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              aria-label="자기소개 영상 URL"
            />
          </TrustRow>

          <TrustRow label="SNS">
            <input
              type="text"
              className="TrustProfile-Input"
              placeholder="SNS 아이디 또는 링크 (선택)"
              value={sns}
              onChange={(e) => setSns(e.target.value)}
              aria-label="SNS"
            />
          </TrustRow>

          <TrustRow label="개인 성향">
            <input
              type="text"
              className="TrustProfile-Input"
              placeholder="예: 단체생활, 성실, 관계중시 (쉼표로 구분 가능)"
              value={personal}
              onChange={(e) => setPersonal(e.target.value)}
              aria-label="개인 성향"
            />
          </TrustRow>
        </div>
      </section>

      <div className="TrustProfile-ActionRow">
        <button className="TrustProfile-PrimaryButton" disabled={!canSave} onClick={onSave}>
          저장
        </button>
      </div>
    </div>
  );
}

function TrustRow({ label, children }) {
  return (
    <div className="TrustProfile-Row">
      <label className="TrustProfile-Label">{label}</label>
      <div className="TrustProfile-InputWrap">{children}</div>
    </div>
  );
}
