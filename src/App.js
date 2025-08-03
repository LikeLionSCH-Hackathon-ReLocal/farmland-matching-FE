import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/Young/MainPage";
import IntroPage from "./pages/Intro/IntroPage"; // 추가
import IntroPage1 from "./pages/Intro/IntroPage1";
import IntroPage2 from "./pages/Intro/IntroPage2";
import SeniorMain from "./pages/Senior/SeniorMain";
import SeniorFlow from "./components/SeniorFlow/FarmlandRegistration/SeniorFlow";
import MyRegisteredLand from "./components/SeniorFlow/FarmlandList/MyRegisteredLand";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntroPage2 />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/SeniorMain" element={<SeniorMain />} />
        <Route path="/senior/register" element={<SeniorFlow />} />
        <Route path="/senior/lands" element={<MyRegisteredLand />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
