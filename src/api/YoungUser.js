const BASE = "http://localhost:8080";

// 1) 따옴표/공백 정리 유틸
function unquote(val) {
  if (val == null) return "";
  const s = String(val).trim();
  // 앞뒤에 큰따옴표 한 겹만 싸여 있으면 벗겨주기
  if (s.length >= 2 && s.startsWith('"') && s.endsWith('"')) {
    return s.slice(1, -1).trim();
  }
  // 백엔드가 \"...\" 형태로 보낼 수도 있으니 역슬래시 제거
  return s.replace(/\\"/g, '"').trim();
}

/** 서버 → UI 매핑 */
function mapToUiProfile(apiObj = {}) {
  return {
    id: apiObj.id ?? "",
    name: unquote(apiObj.buyerName),
    age: apiObj.buyerAge != null ? String(apiObj.buyerAge) : "",
    sex: unquote(apiObj.buyerGender),
    mail: unquote(apiObj.buyerEmail),
    callNumber: unquote(apiObj.buyerNumber),
    // ✅ 이미지 키 정합: buyerImageURL 우선, 없으면 buyerImage
    profileImage:
      apiObj.buyerImageURL ||
      apiObj.buyerImage ||
      "/images/default_profile.png",
    address: unquote(apiObj.buyerAddress),
  };
}

/** 공통 fetch */
async function request(url, options = {}) {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`${options.method || "GET"} ${url} → ${res.status}`);
  return res.status === 204 ? null : res.json();
}

/** GET: 구매자 기본 정보 불러오기 */
export async function getYoungUserData() {
  try {
    const data = await request(`${BASE}/buyer/1`, {
      method: "GET",
      headers: { "Accept": "application/json" },
    });
    const obj = Array.isArray(data) ? data[0] : data;
    return [mapToUiProfile(obj || {})];
  } catch (e) {
    console.error("❌ getYoungUserData 실패:", e);
    return [mapToUiProfile()];
  }
}

/** POST/PUT: 구매자 정보 저장 (form-data 방식) */
export async function saveYoungUserData(user, { method = "POST" } = {}) {
  try {
    const formData = new FormData();
    if (user.id) formData.append("id", user.id);
    formData.append("buyerName", user.name || "");
    formData.append("buyerAge", user.age || "");
    formData.append("buyerGender", user.sex || "");
    formData.append("buyerAddress", user.address || "");
    formData.append("buyerNumber", user.callNumber || "");
    formData.append("buyerEmail", user.mail || "");
    // 파일이 새로 업로드된 경우만 append
    if (user.profileImage instanceof File) {
      formData.append("buyerImage", user.profileImage);
    }

    await fetch(`${BASE}/buyer-upload`, {
      method,
      body: formData,
    });
    return true;
  } catch (e) {
    console.error("❌ saveYoungUserData 실패:", e);
    return false;
  }
}
