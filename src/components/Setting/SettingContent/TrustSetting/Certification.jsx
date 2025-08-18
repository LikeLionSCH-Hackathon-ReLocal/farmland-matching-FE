import { useEffect, useMemo, useState, useCallback } from "react";
import "./Certification.css";
import {
  getBuyerLicenses,
  saveBuyerLicenses,
  sanitizeName,
} from "../../../../api/licenses";

// 서버 응답 → FE 상태 정규화
function normalizeLicense(item) {
  const name = sanitizeName(
    item?.licenseName ?? item?.name ?? item?.title ?? ""
  );
  const file =
    item?.licenseFile ?? item?.fileUrl ?? item?.url ?? item?.filePath ?? "";
  return {
    id: item?.id ?? item?.licenseId ?? null, // id가 없을 수도 있음
    name,
    file: null, // 새로 선택한 파일(로컬)
    fileUrl: String(file || ""), // 서버에 이미 있는 파일 경로/URL
  };
}

export default function Certification({ buyerId = 1, token }) {
  const safeBuyerId = Number.isFinite(Number(buyerId)) ? Number(buyerId) : 1;

  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [dirty, setDirty] = useState(false);

  const loadLicenses = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const list = await getBuyerLicenses({ buyerId: safeBuyerId, token });
      const normalized = (list || []).map(normalizeLicense);
      console.group("[Certification] loadLicenses 결과");
      console.table(normalized);
      console.groupEnd();
      setCertificates(normalized);
      setDirty(false);
    } catch (e) {
      setError(e.message || "자격증 불러오기 실패");
    } finally {
      setLoading(false);
    }
  }, [safeBuyerId, token]);

  useEffect(() => {
    loadLicenses();
  }, [loadLicenses]);

  // 포커스/가시성 복귀 자동 새로고침 → 미저장 변경 시에는 건너뛰기
  useEffect(() => {
    const onFocus = () => {
      if (!dirty && !saving) loadLicenses();
    };
    const onVisibility = () => {
      if (document.visibilityState === "visible" && !dirty && !saving)
        loadLicenses();
    };
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [dirty, saving, loadLicenses]);

  const addCert = () => {
    setCertificates((prev) => [
      ...prev,
      { id: null, name: "", file: null, fileUrl: "" },
    ]);
    setDirty(true);
  };

  const removeCert = (idx) => {
    setCertificates((prev) => prev.filter((_, i) => i !== idx));
    setDirty(true);
  };

  const changeCert = (idx, field, value) => {
    setCertificates((prev) => {
      const next = [...prev];
      const cur = { ...next[idx] };

      if (field === "name") {
        cur.name = value;
      } else if (field === "file") {
        cur.file = value || null;
        if (value) cur.fileUrl = ""; // 교체 UX
        console.log(
          "[Certification] 파일 선택:",
          value?.name,
          value?.type,
          value?.size
        );
      }
      next[idx] = cur;
      return next;
    });
    setDirty(true);
  };

  // 적어도 하나는 입력되어 있어야 저장 버튼 활성화
  const canSave = useMemo(
    () => certificates.some((c) => (c.name || "").trim().length > 0 || c.file),
    [certificates]
  );

  // Certification.jsx
  const onSave = async () => {
    if (!canSave || saving) return;
    setSaving(true);
    setError("");

    try {
      const items = certificates.map((c) => ({
        id: c.id ?? null, // 없으면 null
        name: sanitizeName(c.name || ""),
        file: c.file || null, // 파일 없으면 null
      }));

      console.log("[Certification] 저장 요청", items);

      await saveBuyerLicenses({ buyerId: safeBuyerId, items, token });

      await loadLicenses();
      alert("자격증이 저장되었습니다.");
      setDirty(false);
    } catch (e) {
      setError(e.message || "저장 중 오류가 발생했습니다.");
      console.error("[Certification] 저장 오류:", e);
    } finally {
      setSaving(false);
    }
  };

  const looksLikeUrl = (v) => /^https?:\/\//i.test(v) || v.startsWith("/");

  return (
    <div className="Certification-Container">
      <div className="Certification-Header">
        <h2>자격증 업로드</h2>
        <p>보유 자격증을 등록하고 파일(PDF)을 첨부해 주세요.</p>
      </div>

      {loading && <div className="Certification-Empty">불러오는 중…</div>}
      {!!error && (
        <div className="Certification-Empty" style={{ color: "#b00020" }}>
          {error}
        </div>
      )}

      {!loading && (
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
            <div
              className="Certification-RowGrid"
              key={cert.id ?? `new-${idx}`}
            >
              {/* 자격증 이름 */}
              <input
                type="text"
                placeholder="자격증 이름"
                value={cert.name}
                onChange={(e) => changeCert(idx, "name", e.target.value)}
                className="Certification-Input"
              />

              {/* 기존 파일 링크 + 파일 교체 입력 */}
              <div className="Certification-FileCell">
                {cert.fileUrl &&
                  (looksLikeUrl(cert.fileUrl) ? (
                    <a
                      className="Certification-ExistingLink"
                      href={cert.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      업로드된 파일 보기
                    </a>
                  ) : (
                    <div
                      className="Certification-ExistingLink"
                      title={cert.fileUrl}
                    >
                      {cert.fileUrl}
                    </div>
                  ))}
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) =>
                    changeCert(idx, "file", e.target.files?.[0] || null)
                  }
                  className="Certification-Input"
                />
              </div>

              <button
                className="Certification-DeleteButton"
                onClick={() => removeCert(idx)}
              >
                삭제
              </button>
            </div>
          ))}
        </section>
      )}

      <div className="Certification-ActionRow">
        <button
          className="Certification-PrimaryButton"
          disabled={!canSave || saving}
          onClick={onSave}
        >
          {saving ? "저장 중…" : "저장"}
        </button>
      </div>
    </div>
  );
}
