const BASE = "http://localhost:8080";

/** 서버 → UI 매핑 */
function mapToUiProfile(apiObj = {}) {
  return {
    id: apiObj.id ?? "",
    name: apiObj.buyerName ?? "",
    age: apiObj.buyerAge?.toString() ?? "",
    sex: apiObj.buyerGender ?? "",
    mail: apiObj.buyerEmail ?? "",
    callNumber: apiObj.buyerNumber ?? "",
    profileImage: apiObj.buyerImage ?? "/images/default_profile.png",
    address: apiObj.buyerAddress ?? "",
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
    const data = await request(`${BASE}/buyer-upload`, {
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
