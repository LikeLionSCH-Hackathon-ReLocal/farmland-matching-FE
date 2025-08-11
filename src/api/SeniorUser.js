// api/SeniorUser.js
const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";
console.log("API BASE_URL:", BASE_URL);

export async function getSeller(sellerId) {
  const url = `${BASE_URL}/seller/${sellerId}`;
  console.log("getSeller 호출 URL:", url);

  const res = await fetch(url);
  if (!res.ok) throw new Error("판매자 정보 불러오기 실패");
  return res.json();
}

// 숫자 변환 유틸: 빈문자/undefined → null, 숫자문자 → Number
function toIntOrNull(v) {
  if (v === "" || v === undefined || v === null) return null;
  const n = Number(v);
  return Number.isNaN(n) ? null : n;
}

// ✳️ 프론트 상태 → 백엔드 DTO로 변환해서 PUT
export async function updateSeller(sellerId, profile) {
  const payload = {
    sellerName: profile.name ?? "",
    sellerYear: toIntOrNull(profile.birthYear),
    sellerNumber: profile.phone ?? "",
    sellerAddress: profile.address ?? "",
    sellerLand: toIntOrNull(profile.landCount),
  };

  const url = `${BASE_URL}/seller-update/${sellerId}`;
  console.log("updateSeller 호출 URL:", url);
  console.log("updateSeller payload:", payload);

  const res = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const text = await res.text(); // 백엔드가 비어있는 본문을 줄 수도 있음
  console.log("서버 응답 상태:", res.status);
  console.log("서버 응답 본문:", text);

  if (!res.ok) throw new Error("판매자 정보 업데이트 실패");
  return text ? JSON.parse(text) : null;
}
