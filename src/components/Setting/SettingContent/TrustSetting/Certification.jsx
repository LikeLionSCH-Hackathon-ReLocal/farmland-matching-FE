// 배치 저장(JSON) + 개별 파일 업로드 2단계 버전
// - 자동 재조회 dirty 가드 유지
// - 원본 스냅샷 비교로 변경분만 안전 저장
// - 서버가 '배치 저장' 시 최신 목록을 반환한다고 가정

import { useEffect, useMemo, useState, useCallback } from "react";
import "./Certification.css";
import {
  getBuyerLicenses,
  saveBuyerLicensesBatch,
  uploadLicenseFile,
} from "../../../../api/licenses";

function normalizeLicense(item) {
  const name = item?.licenseName ?? item?.name ?? item?.title ?? "";
  const file = item?.licenseFile ?? item?.fileUrl ?? item?.url ?? item?.filePath ?? "";
  return {
    id: item?.id ?? item?.licenseId ?? null,
    name: String(name || ""),
    file: null,                  // 새로 선택한 파일(로컬)
    fileUrl: String(file || ""), // 서버에 이미 있는 파일 경로/URL
  };
}

export default function Certification({ buyerId = 1, token }) {
  const safeBuyerId = Number.isFinite(Number(buyerId)) ? Number(buyerId) : 1;

  const [certificates, setCertificates] = useState([]);
  const [orig, setOrig] = useState([]);      // 원본 스냅샷
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
      setOrig(normalized);
      setDirty(false);
    } catch (e) {
      setError(e.message || "자격증 불러오기 실패");
    } finally {
      setLoading(false);
    }
  }, [safeBuyerId, token]);

  useEffect(() => { loadLicenses(); }, [loadLicenses]);

  // 포커스/가시성 복귀 자동 새로고침 → 미저장 변경 시에는 건너뛰기
  useEffect(() => {
    const onFocus = () => { if (!dirty && !saving) loadLicenses(); };
    const onVisibility = () => {
      if (document.visibilityState === "visible" && !dirty && !saving) loadLicenses();
    };
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [dirty, saving, loadLicenses]);

  const addCert = () => {
    setCertificates((prev) => [...prev, { id: null, name: "", file: null, fileUrl: "" }]);
    setDirty(true);
  };

  const removeCert = (idx) => {
    setCertificates((prev) => prev.filter((_, i) => i !== idx));
    setDirty(true);
  };

  const changeCert = (idx, field, value) => {
    setCertificates((prev) => {
      const next = [...prev];
      const cur = { ...next[idx], [field]: value };
      if (field === "file") {
        cur.fileUrl = ""; // 교체 UX
        console.log("[Certification] 파일 선택:", value?.name, value?.type, value?.size);
      }
      next[idx] = cur;
      return next;
    });
    setDirty(true);
  };

  const canSave = useMemo(
    () => certificates.some((c) => (c.name || "").trim().length > 0 || c.file || c.id != null),
    [certificates]
  );

  // 원본과 비교하여 배치 저장 페이로드 생성
  function buildBatchPayload() {
    // orig에 있던 id 모음
    const origIds = new Set(orig.filter(o => o.id != null).map(o => String(o.id)));
    const nowIds  = new Set(certificates.filter(c => c.id != null).map(c => String(c.id)));

    const payload = [];
    const fileUploads = []; // 2단계 업로드 목록 { id, file }

    // 수정 & 파일 교체
    certificates.forEach((c) => {
      const name = (c.name || "").trim();
      if (c.id != null) {
        const o = orig.find(x => String(x.id) === String(c.id)) || null;
        const nameChanged = !!name && name !== (o?.name || "");
        if (nameChanged) {
          payload.push({ licenseId: c.id, licenseName: name });
        }
        if (c.file) {
          fileUploads.push({ id: c.id, file: c.file });
        }
      } else {
        // 신규: 이름이 있거나 파일이 있으면 우선 메타 저장(파일은 2단계)
        if (name || c.file) {
          payload.push({ licenseName: name }); // 서버가 id를 생성해 반환
        }
      }
    });

    // 삭제(옵션): 프론트에서 제거된 행 중 id 있던 것
    orig.forEach((o) => {
      if (o.id != null && !nowIds.has(String(o.id))) {
        // 서버가 delete 플래그를 인식하도록 계약(추천인과 동일 패턴)
        payload.push({ licenseId: o.id, delete: true });
      }
    });

    return { payload, fileUploads };
  }

  const onSave = async () => {
    if (!canSave || saving) return;
    setSaving(true);
    setError("");
    try {
      const { payload, fileUploads } = buildBatchPayload();

      console.group("[Certification] 1단계 배치 저장 페이로드");
      console.table(payload);
      console.groupEnd();

      // 1단계: 메타데이터 배치 저장
      const afterSaveList = await saveBuyerLicensesBatch({
        buyerId: safeBuyerId,
        rows: payload,
        token,
      });

      // 서버가 최신 목록을 반환하면 그걸 기준으로 신규 ID 매칭
      const afterMap = new Map(
        (Array.isArray(afterSaveList) ? afterSaveList : []).map(it => {
          const id = it.id ?? it.licenseId;
          const name = it.licenseName ?? it.name ?? "";
          const fileUrl = it.licenseFile ?? it.fileUrl ?? it.filePath ?? "";
          return [String(id), { id, name, fileUrl }];
        })
      );

      // 신규 중 파일이 있는 항목들: 생성된 ID를 찾아 업로드 목록에 추가
      certificates.forEach((c) => {
        if (!c.id && c.file) {
          // 동일 이름으로 매칭(필요 시 더 견고한 매칭 규칙 적용)
          const match = [...afterMap.values()].find(v => (v.name || "") === (c.name || ""));
          if (match?.id) {
            fileUploads.push({ id: match.id, file: c.file });
          }
        }
      });

      console.group("[Certification] 2단계 파일 업로드 목록");
      console.table(fileUploads.map(f => ({ licenseId: f.id, file: f.file?.name })));
      console.groupEnd();

      // 2단계: 파일 업로드(개별)
      for (const item of fileUploads) {
        await uploadLicenseFile({
          buyerId: safeBuyerId,
          licenseId: item.id,
          file: item.file,
          token,
        });
      }

      // 최종 재조회
      await loadLicenses();
      alert("자격증이 저장되었습니다.");
      setDirty(false);
    } catch (e) {
      setError(e.message || "저장 중 오류가 발생했습니다.");
      console.error("[Certification] 저장 중 오류:", e);
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
      {!!error && <div className="Certification-Empty" style={{ color: "#b00020" }}>{error}</div>}

      {!loading && (
        <section className="Certification-Card">
          <div className="Certification-CardHeader">
            <h3>자격증 목록</h3>
            <button className="Certification-AddButton" onClick={addCert}>+ 추가</button>
          </div>

          {certificates.length === 0 && (
            <div className="Certification-Empty">자격증을 추가해 주세요.</div>
          )}

          {certificates.map((cert, idx) => (
            <div className="Certification-RowGrid" key={cert.id ?? `new-${idx}`}>
              <input
                type="text"
                placeholder="자격증 이름"
                value={cert.name}
                onChange={(e) => changeCert(idx, "name", e.target.value)}
                className="Certification-Input"
              />

              <div className="Certification-FileCell">
                {cert.fileUrl && (
                  looksLikeUrl(cert.fileUrl) ? (
                    <a className="Certification-ExistingLink" href={cert.fileUrl} target="_blank" rel="noreferrer">
                      업로드된 파일 보기
                    </a>
                  ) : (
                    <div className="Certification-ExistingLink" title={cert.fileUrl}>{cert.fileUrl}</div>
                  )
                )}
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => changeCert(idx, "file", e.target.files?.[0] || null)}
                  className="Certification-Input"
                />
              </div>

              <button className="Certification-DeleteButton" onClick={() => removeCert(idx)}>
                삭제
              </button>
            </div>
          ))}
        </section>
      )}

      <div className="Certification-ActionRow">
        <button className="Certification-PrimaryButton" disabled={!canSave || saving} onClick={onSave}>
          {saving ? "저장 중…" : "저장"}
        </button>
      </div>
    </div>
  );
}
