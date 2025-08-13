// src/components/Setting/SettingContent/TrustSetting/Certification.jsx
import { useEffect, useMemo, useState } from "react";
import "./Certification.css";

/**
 * 자격증만 관리하는 전용 페이지
 * props:
 * - user: YoungUser 객체
 * - onUserChange(updatedUser): 상위 저장 콜백
 */
export default function Certification({ user, onUserChange }) {
  // [{ name, file }]
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    if (!user) return;

    // detail.certification(object) 또는 certificationList(array)에서 초기화
    const fromObj = Object.values(user.detail?.certification || {}).filter(Boolean);
    const fromList = user.detail?.certificationList || [];
    const merged = [...new Set([...fromObj, ...fromList])];
    setCertificates(merged.map((n) => ({ name: n, file: null })));
  }, [user]);

  const addCert = () => setCertificates((prev) => [...prev, { name: "", file: null }]);
  const removeCert = (idx) => setCertificates((prev) => prev.filter((_, i) => i !== idx));
  const changeCert = (idx, field, value) =>
    setCertificates((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], [field]: value };
      return next;
    });

  const canSave = useMemo(
    () => certificates.some((c) => c.name?.trim()),
    [certificates]
  );

  const onSave = () => {
    if (!user) return;

    // 저장은 리스트 중심으로, (구버전 호환 위해 object도 같이 세팅)
    const list = certificates.map((c) => c.name).filter(Boolean);
    const obj = list.reduce((acc, cur, i) => {
      acc[`cert_${i + 1}`] = cur;
      return acc;
    }, {});

    const updated = {
      ...user,
      detail: {
        ...user.detail,
        certificationList: list,
        certification: obj, // 호환용
      },
    };

    onUserChange?.(updated);
    alert("자격증이 저장되었습니다.");
    console.log("✅ Certificates saved:", updated.detail.certificationList);
  };

  return (
    <div className="Certification-Container">
      <div className="Certification-Header">
        <h2>자격증 업로드</h2>
        <p>보유 자격증을 등록하고 파일(PDF)을 첨부해 주세요.</p>
      </div>

      <section className="Certification-Card">
        <div className="Certification-CardHeader">
          <h3>자격증 목록</h3>
          <button className="Certification-AddButton" onClick={addCert}>
            + 추가
          </button>
        </div>

        {certificates.length === 0 && (
          <div className="Certification-Empty">자격증을 추가해 주세요.</div>
        )}

        {certificates.map((cert, idx) => (
          <div className="Certification-RowGrid" key={idx}>
            <input
              type="text"
              placeholder="자격증 이름"
              value={cert.name}
              onChange={(e) => changeCert(idx, "name", e.target.value)}
              className="Certification-Input"
            />
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => changeCert(idx, "file", e.target.files?.[0] || null)}
              className="Certification-Input"
            />
            <button
              className="Certification-DeleteButton"
              onClick={() => removeCert(idx)}
            >
              삭제
            </button>
          </div>
        ))}
      </section>

      <div className="Certification-ActionRow">
        <button
          className="Certification-PrimaryButton"
          disabled={!canSave}
          onClick={onSave}
        >
          저장
        </button>
      </div>
    </div>
  );
}
