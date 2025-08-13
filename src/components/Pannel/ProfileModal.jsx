import React, { useEffect, useCallback } from "react";
import "./ProfileModal.css";

export default function ProfileModal({ user, loading, onClose }) {
  // ⎯⎯⎯ ESC로 닫기 ⎯⎯⎯
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose?.();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="ProfileModal-Overlay" role="dialog" aria-modal="true">
      <div className="ProfileModal-Card">
        <div className="ProfileModal-Header">
          <div className="ProfileModal-Title">내 프로필</div>
          <button className="ProfileModal-Close" onClick={onClose} aria-label="닫기">
            ×
          </button>
        </div>

        {loading ? (
          <div className="ProfileModal-Loading">불러오는 중…</div>
        ) : !user ? (
          <div className="ProfileModal-Empty">프로필 정보를 찾을 수 없습니다.</div>
        ) : (
          <div className="ProfileModal-Body">
            {/* ⎯⎯⎯ 상단: 사진 + 이름/성별/나이 ⎯⎯⎯ */}
            <section className="ProfileModal-Section full ProfileModal-Top">
              <div className="ProfileModal-Avatar">
                <img src="/images/youngfarmer_image.png" alt="프로필" />
              </div>

              <div className="ProfileModal-TopInfo">
                <div className="ProfileModal-Identity">
                  <div className="ProfileModal-Name">{user.name || "이름 미입력"}</div>
                  <div className="ProfileModal-Tags">
                    {user.sex && <span className="tag">{user.sex}</span>}
                    {user.age && <span className="tag">{user.age}세</span>}
                  </div>
                </div>

                {/* 연락/주소를 가독성 높게 분리 */}
                <div className="ProfileModal-QuickGrid">
                  {(user.callNumber || user.mail) && (
                    <div className="ProfileModal-QuickCard">
                      <div className="quick-title">연락</div>
                      {user.callNumber && (
                        <div className="quick-row">
                          <span className="quick-ico">📞</span>
                          <span>{user.callNumber}</span>
                        </div>
                      )}
                      {user.mail && (
                        <div className="quick-row">
                          <span className="quick-ico">✉️</span>
                          <span>{user.mail}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {user.address && (
                    <div className="ProfileModal-QuickCard">
                      <div className="quick-title">주소</div>
                      <div className="quick-row">
                        <span className="quick-ico">📍</span>
                        <span className="quick-address">{user.address}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* 자기소개 */}
            {(user.detail?.intro?.OneWord ||
              user.detail?.intro?.PullWord ||
              user.detail?.intro?.sns ||
              user.detail?.intro?.video) && (
              <section className="ProfileModal-Section full">
                <h4>자기소개</h4>
                {user.detail?.intro?.OneWord && (
                  <div className="ProfileModal-Quote">“{user.detail.intro.OneWord}”</div>
                )}
                {user.detail?.intro?.PullWord && (
                  <p className="ProfileModal-Paragraph">{user.detail.intro.PullWord}</p>
                )}
                {user.detail?.intro?.sns && (
                  <div className="ProfileModal-Meta">SNS: {user.detail.intro.sns}</div>
                )}
                {user.detail?.intro?.video && (
                  <a
                    className="ProfileModal-Link"
                    href={user.detail.intro.video}
                    target="_blank"
                    rel="noreferrer"
                  >
                    소개 영상 보러가기 ↗
                  </a>
                )}
              </section>
            )}

            {/* 칩 섹션 */}
            <SectionChips
              title="자격증"
              list={user.detail?.certificationList || Object.values(user.detail?.certification || {})}
            />
            <SectionChips title="수상 경력" list={formatAwards(user)} />
            <SectionChips
              title="관심 작물"
              list={user.detail?.interestList || Object.values(user.detail?.interest || {})}
            />
            <SectionChips
              title="사용 장비"
              list={user.detail?.equipmentList || Object.values(user.detail?.equipment || {})}
            />

            {/* 거래 형태 */}
            {(user.detail?.tradesList?.length || Object.values(user.detail?.trade || {}).length) > 0 && (
              <section className="ProfileModal-Section">
                <h4>거래 형태</h4>
                <div className="ProfileModal-Chips">
                  {(user.detail?.tradesList?.length
                    ? user.detail.tradesList
                    : Object.values(user.detail?.trade || {}))
                    .filter(Boolean)
                    .map((t, i) => (
                      <span className="chip" key={i}>
                        {t}
                      </span>
                    ))}
                </div>
                {user.detail?.leasePeriod && (
                  <div className="ProfileModal-Meta">임대 기간: {user.detail.leasePeriod}</div>
                )}
                {user.detail?.otherTrade && (
                  <div className="ProfileModal-Meta">기타: {user.detail.otherTrade}</div>
                )}
              </section>
            )}

            {/* 추천인 */}
            {(user.detail?.recommendersList?.length || user.detail?.recommand1) && (
              <section className="ProfileModal-Section full">
                <h4>추천인</h4>
                <div className="ProfileModal-Recommenders">
                  {(user.detail?.recommendersList?.length
                    ? user.detail.recommendersList
                    : [user.detail?.recommand1, user.detail?.recommand2, user.detail?.recommand3].filter(
                        Boolean
                      )
                  ).map((r, i) => (
                    <div className="recomm-row" key={i}>
                      <strong>{r.name || r}</strong>
                      {r.relation && <span> · {r.relation || r.rel}</span>}
                      {r.phone && <span> · {r.phone}</span>}
                      {r.mail && <span> · {r.mail}</span>}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function SectionChips({ title, list }) {
  const items = (list || []).filter(Boolean);
  if (items.length === 0) return null;
  return (
    <section className="ProfileModal-Section">
      <h4>{title}</h4>
      <div className="ProfileModal-Chips">
        {items.map((v, i) => (
          <span className="chip" key={`${title}-${i}`}>
            {typeof v === "string" ? v : v.title || ""}
          </span>
        ))}
      </div>
    </section>
  );
}

function formatAwards(user) {
  if (user?.detail?.awardsList?.length) {
    return user.detail.awardsList.map((a) =>
      [a.title, a.org, a.year].filter(Boolean).join(" / ")
    );
  }
  const win = user?.detail?.win || {};
  return Object.values(win || {});
}
