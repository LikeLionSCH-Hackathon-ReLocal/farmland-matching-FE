// src/api/licenses.js
const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8080";

// 따옴표 정리 유틸: '"정보"' → '정보'
export function sanitizeName(raw) {
  if (raw == null) return "";
  let s = String(raw).trim();
  // 양끝 " 또는 ' 제거
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    s = s.slice(1, -1);
  }
  // 연속 따옴표 방어
  s = s.replace(/^"+|"+$/g, "").replace(/^'+|'+$/g, "");
  return s.trim();
}

/** GET /{buyerId}/licenses (유연 파싱 + 캐시 무효화) */
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
    id: it.id ?? it.licenseId ?? it.seq ?? null,  // id 없을 수도 있음
    licenseName: sanitizeName(it.licenseName ?? it.name ?? it.title ?? ""),
    fileUrl: it.licenseFile ?? it.fileUrl ?? it.filePath ?? it.url ?? "",
  }));

  console.table(normalized.map(({ id, licenseName, fileUrl }) => ({ id, licenseName, fileUrl })));
  return normalized;
}

/**
 * 단건 업서트 저장(서버가 확실히 지원하는 멀티파트 방식)
 * - name이 비어있으면 전송하지 않음(기존값 보존)
 * - file 없으면 파일 필드 생략(기존 파일 보존)
 * - id는 서버가 필요 시에만 쓰도록(없으면 생략)
 */
export async function saveBuyerLicenses({
  buyerId = 1,
  items = [], // [{id, name, file}]
  token,
} = {}) {
  const url = `${API_BASE}/${encodeURIComponent(buyerId)}/license-save`;
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;

  const fd = new FormData();

  items.forEach((it, i) => {
    // id: null이면 "null" 문자열로 보내기
    const id   = it.id != null ? String(it.id) : "null";
    const name = it.name || "";
    const file = it.file || null;

    fd.append("licenseId[]", id);
    fd.append("licenseName[]", name);

    if (file) {
      fd.append("licenseFile[]", file);
    } else {
      // 파일 변경 없음 → "null" 문자열을 보냄
      fd.append("licenseFile[]", "null");
    }
  });

  console.group(`[licenses.js] POST ${url}`);
  for (const [k, v] of fd.entries()) {
    console.log("FormData >", k, v instanceof File ? v.name : v);
  }
  console.groupEnd();

  const res = await fetch(url, { method: "POST", headers, body: fd });
  const text = await res.text().catch(() => "");
  if (!res.ok) throw new Error(`POST /license-save 실패 (${res.status}) ${text}`);
  return { ok: true };
}

// src/api/licenses.js
export async function saveBuyerLicensesBatch({
  buyerId = 1,
  items = [], // [{id, name, file}] 전체 스냅샷
  token,
} = {}) {
  const url = `${API_BASE}/${encodeURIComponent(buyerId)}/license-save`;
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;

  const fd = new FormData();

  // 최소 한 항목이라도 유효해야 전송
  const valid = items.some(it => (sanitizeName(it.name || "") || it.file));
  if (!valid) throw new Error("전송할 자격증이 없습니다.");

  items.forEach((it, i) => {
    const id   = it.id != null && it.id !== "" ? String(it.id) : "";
    const name = sanitizeName(it.name || "");
    const file = it.file || null;

    if (id)   fd.append("licenseId[]", id);
    if (name) fd.append("licenseName[]", name);
    // 파일이 없고 기존 링크 유지라면 file은 비우고 서버가 기존 파일을 유지하도록 계약해야 합니다.
    if (file) fd.append("licenseFile[]", file);
    else fd.append("licenseFile[]", new Blob([]), ""); // 서버가 배열 길이 맞추길 요구한다면
  });

  console.group(`[licenses.js] BATCH POST ${url}`);
  for (const [k, v] of fd.entries()) {
    console.log("FormData >", k, v instanceof File ? v.name : v);
  }
  const res = await fetch(url, { method: "POST", headers, body: fd });
  const text = await res.text().catch(() => "");
  console.info("status:", res.status);
  console.info("raw:", text.slice(0, 800));
  console.groupEnd();

  if (!res.ok) throw new Error(`POST /license-save 실패 (${res.status}) ${text}`);
  return { ok: true };
}
