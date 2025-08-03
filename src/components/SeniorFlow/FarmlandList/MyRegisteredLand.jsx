import "./MyRegisteredLand.css";

const dummyLands = [
  {
    id: 1,
    name: "아산 🥔 농지 1",
    location: "충남 아산시 도고면",
    crop: "감자",
    area: 800,
    status: "매칭 대기",
  },
  {
    id: 2,
    name: "아산 🍅 농지 2",
    location: "충남 아산시 배방읍",
    crop: "토마토",
    area: 1200,
    status: "매칭 중",
  },
];

function MyRegisteredLand() {
  return (
    <div className="MyLandContainer">
      <h2>📋 내가 등록한 농지 목록</h2>
      {dummyLands.length === 0 ? (
        <p>아직 등록된 농지가 없습니다.</p>
      ) : (
        dummyLands.map((land) => (
          <div key={land.id} className="LandCard">
            <div className="LandTitle">{land.name}</div>
            <div className="LandDetails">
              📍 {land.location} | 🌱 {land.crop} | 📐 {land.area}㎡
            </div>
            <div className="LandStatus">상태: {land.status}</div>
          </div>
        ))
      )}
    </div>
  );
}

export default MyRegisteredLand;
