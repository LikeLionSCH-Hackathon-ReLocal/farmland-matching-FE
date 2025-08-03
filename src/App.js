import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import IntroPage from "./pages/IntroPage"; // 추가
import IntroPage1 from "./pages/IntroPage1";
import IntroPage2 from "./pages/IntroPage2";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntroPage2 />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
