// src/api/licenses.js
const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8080";

/** 유연 파싱 + 캐시 무효화 GET */
export async function getBuyerLicenses({ buyerId = 1, token } = {}) {
  const url = `${API_BASE}/${encodeURIComponent(buyerId)}/licenses`;
  const headers = { Accept: "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  console.group(`[licenses.js][GET] ${url}`);
  const res = await fetch(url, { method: "GET", headers, cache: "no-store" });
  const raw = await res.text().catch(() => "");
  console.info("status:", res.status);
  console.info("raw:", raw.slice(0, 800));
  console.groupEnd();

  if (res.status === 204) return [];
  if (!res.ok) throw new Error(`GET /licenses 실패 (${res.status}) ${raw}`);

  let data = {};
  try { data = raw ? JSON.parse(raw) : {}; } catch { data = {}; }

  const list =
    Array.isArray(data) ? data
    : Array.isArray(data?.licenses) ? data.licenses
    : Array.isArray(data?.data) ? data.data
    : Array.isArray(data?.result) ? data.result
    : [];

  const normalized = list.map((it) => ({
    id: it.id ?? it.licenseId ?? it.seq ?? null,
    licenseName: it.licenseName ?? it.name ?? it.title ?? "",
    fileUrl: it.licenseFile ?? it.fileUrl ?? it.filePath ?? it.url ?? "",
  }));

  console.table(normalized.map(({ id, licenseName, fileUrl }) => ({ id, licenseName, fileUrl })));
  return normalized;
}

/**
 * 1단계) 배치 저장(JSON)
 * - 추천인과 동일 컨트랙트: 배열을 한 번에 저장.
 * - 각 원소: { licenseId?, licenseName?, fileUrl?, delete? }
 * - 서버가 최신 전체 목록을 반환한다고 가정(권장).
 */
export async function saveBuyerLicensesBatch({ buyerId = 1, rows = [], token } = {}) {
  const url = `${API_BASE}/${encodeURIComponent(buyerId)}/license-save`;
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  console.group(`[licenses.js][BATCH SAVE] POST ${url}`);
  console.table(rows);
  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(rows),
  });
  const raw = await res.text().catch(() => "");
  console.info("status:", res.status);
  console.info("raw:", raw.slice(0, 800));
  console.groupEnd();

  if (!res.ok) throw new Error(`POST /license-save 실패 (${res.status}) ${raw}`);

  try {
    const data = raw ? JSON.parse(raw) : [];
    // 최신 전체 목록/또는 저장 결과 배열을 그대로 반환
    return Array.isArray(data) ? data
      : Array.isArray(data?.licenses) ? data.licenses
      : Array.isArray(data?.data) ? data.data
      : Array.isArray(data?.result) ? data.result
      : [];
  } catch {
    return [];
  }
}

/**
 * 2단계) 파일 업로드(개별)
 * - 신규/수정 후 파일이 있는 항목만 호출.
 * - 서버가 동일 엔드포인트에서 multipart 업서트를 지원한다고 가정.
 *   (필요 시 /license-upload/{licenseId} 같은 별도 엔드포인트로 바꿔도 됨)
 */
export async function uploadLicenseFile({ buyerId = 1, licenseId, file, token } = {}) {
  if (!licenseId || !file) return;

  const url = `${API_BASE}/${encodeURIComponent(buyerId)}/license-save`;
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;

  const fd = new FormData();
  fd.append("licenseId", String(licenseId));
  fd.append("licenseFile", file);

  console.group(`[licenses.js][UPLOAD] POST ${url}`);
  const fdObj = {};
  for (const [k, v] of fd.entries()) fdObj[k] = v instanceof File ? `(file) ${v.name}` : v;
  console.table(fdObj);
  const res = await fetch(url, { method: "POST", headers, body: fd });
  const raw = await res.text().catch(() => "");
  console.info("status:", res.status);
  console.info("raw:", raw.slice(0, 800));
  console.groupEnd();

  if (!res.ok) throw new Error(`파일 업로드 실패 (${res.status}) ${raw}`);
}
