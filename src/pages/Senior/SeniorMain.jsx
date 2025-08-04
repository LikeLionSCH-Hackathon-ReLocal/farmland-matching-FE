import { useNavigate } from "react-router-dom";
import "./SeniorMain.css";

function SeniorMain() {
  const navigate = useNavigate();

  return (
    <div className="SeniorMainContainer">
      <h1>👵 어르신 농지 관리</h1>
      <p>농지를 등록하거나, 등록한 내역을 확인할 수 있어요.</p>

      <div className="ButtonGroup">
        <button
          className="RegisterButton"
          onClick={() => navigate("/senior/profile")}
        >
          👤 개인 정보 입력하기
        </button>
        <button
          className="RegisterButton"
          onClick={() => navigate("/senior/register")}
        >
          + 농지 등록하기
        </button>
        <button
          className="RegisterButton"
          onClick={() => navigate("/senior/lands")}
        >
          📄 등록한 농지 목록 보기
        </button>
      </div>
    </div>
  );
}

export default SeniorMain;
