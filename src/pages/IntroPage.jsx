import { useNavigate } from "react-router-dom";
import Header from "../components/Pannel/Header";
import "./IntroPage.css"; // 스타일 따로 관리

function IntroPage() {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/main");
  };

  return (
    <div className="IntroContainer">
      <Header />
      <div className="IntroContent">
        <h1>
          농지를 <span className="blue">찾는 이</span>와{" "}
          <span className="blue">맡기고 싶은 이</span>를 잇습니다.
        </h1>
        <p className="subtext">내 손으로 가꾼 농지, 이제는 누군가의 시작이 됩니다.</p>
        <button className="start-button" onClick={handleStartClick}>
          시작하기
        </button>
        {/* 아래에 Key Features 컴포넌트로 분리해도 좋음 */}
      </div>
      <div className="KeyFeatures1">
        <div className ="FeatureHeader">[Feature Section - #01]</div>
        <div className ="FeatureTitle">Key Feature - 판매자</div>
        <div className ="FeatureContent">간편한 농지 등록</div>
        <div className ="FeatureExplain"></div>
      </div>

    </div>
  );
}

export default IntroPage;
