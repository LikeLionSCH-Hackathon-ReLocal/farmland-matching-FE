import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import "./IntroPage2.css";
import FloatingEmojis from "../Effect/FloatingEmojis.jsx";
import BgmController from "../Effect/BgmController.jsx";

const DIALECTS = {
  서울: {
    title: "밭 내놓으셨어요? 밭 팔래요?",
    main: "농지를 찾는 이와 맡기고 싶은 이를 잇습니다.",
    typing: "[내 손으로 가꾼 농지, 이제는 누군가의 시작이 됩니다.]",
  },
  충청도: {
    title: "밭 내놨어유? 밭 팔라고유?",
    main: "논 밭 찾는 사람하고 맡길 사람을 이어유.",
    typing: "[내 손으로 부지런히 일군 밭, 누군가한테 넘겨줄 때 됐슈.]",
  },
  경상도: {
    title: "밭 내놨나예? 팔라꼬예?",
    main: "논 찾는 사람하고 맡기고픈 사람 이어줍니더.",
    typing: "[내가 고생해서 일군 밭, 누군가한테 넘기겠심더.]",
  },
  전라도: {
    title: "밭 내놨당가요? 팔라구요?",
    main: "농지 찾는 이랑, 맡기고픈 이랑 이어불랑께요.",
    typing: "[내 손으로 가꾼 밭이제 누군가한테 넘겨불랑께.]",
  },
  제주도: {
    title: "밭 내놨수과? 팔암쥬?",
    main: "농사짓을 사람과 맡을 사람 이어줍주.",
    typing: "[내 손으로 키운 밭, 이제 누군가 시작헐 때주.]",
  },
};

const sellerFeatures = [
  {
    title: "간편한 농지 등록",
    desc: "등기부등본, 지적도 등을 클릭만으로 업로드",
    icon: "/icons/register.png",
  },
  {
    title: "안심 소통 시스템",
    desc: "연락처 노출 없이 초기 대화 가능",
    icon: "/icons/chat.png",
  },
  {
    title: "AI 농업자 추천",
    desc: "내 땅과 어울리는 청년 농부 자동 매칭",
    icon: "/icons/ai.png",
  },
  {
    title: "기본 계약서 자동 생성",
    desc: "자동 문서화 및 출력 기능 제공",
    icon: "/icons/document.png",
  },
  {
    title: "농지 히스토리 소개",
    desc: "내 땅의 이야기를 글/사진으로 등록 가능",
    icon: "/icons/history.png",
  },
  {
    title: "인증 기반 거래",
    desc: "실명/자격 기반 매칭으로 신뢰 보장",
    icon: "/icons/check.png",
  },
];

const buyerFeatures = [
  {
    title: "지도 기반 농지 탐색",
    desc: "지역별로 관심 농지를 시각적으로 탐색",
    icon: "/icons/map.png",
  },
  {
    title: "1년 예상 수익 시뮬레이션",
    desc: "작물 선택 시 수익 확인",
    icon: "/icons/profit.png",
  },
  {
    title: "나의 농업 프로필 등록",
    desc: "자격증, 수료증, 희망 작물 등 입력",
    icon: "/icons/profile.png",
  },
  {
    title: "실명 인증 및 이력 검증",
    desc: "구매자 신뢰도를 위한 인증 시스템",
    icon: "/icons/verify.png",
  },
  {
    title: "판매자에게 질문하기",
    desc: "내조건, 토양, 위치 등 실시간 문의",
    icon: "/icons/question.png",
  },
  {
    title: "맞춤형 농지 추천",
    desc: "나의 조건과 맞는 땅을 자동 추천",
    icon: "/icons/recommend.png",
  },
];

function TypingText({ text, speed = 60, pause = 3000 }) {
  const [displayedText, setDisplayedText] = useState("");
  const [phase, setPhase] = useState("typing");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timeout;
    if (phase === "typing") {
      if (index < text.length) {
        timeout = setTimeout(() => {
          setDisplayedText((prev) => prev + text.charAt(index));
          setIndex(index + 1);
        }, speed);
      } else {
        timeout = setTimeout(() => setPhase("deleting"), pause);
      }
    } else if (phase === "deleting") {
      if (index > 0) {
        timeout = setTimeout(() => {
          setDisplayedText((prev) => prev.slice(0, -1));
          setIndex(index - 1);
        }, speed / 1.5);
      } else {
        timeout = setTimeout(() => setPhase("typing"), 500);
      }
    }
    return () => clearTimeout(timeout);
  }, [index, phase, text, speed, pause]);

  return <p className="subtext typing">{displayedText}</p>;
}

function IntroPage2() {
  const navigate = useNavigate();
  const [dialect, setDialect] = useState("충청도");

  useEffect(() => {
    AOS.init({ duration: 1000, once: false, mirror: true });
  }, []);

  return (
    <div className="Intro2Container">
      <FloatingEmojis />
      <BgmController />
      <div className="Intro2Foreground">
        <section className="SectionBlock" data-aos="fade-up">
          <div className="Intro2Background">
            <div className="Intro2Header">
              <img src="/LOGO1.png" alt="Logo" className="Intro2LogoImage" />
              <div className="Intro2Title">{DIALECTS[dialect].title}</div>
            </div>

            <div className="dialect-buttons">
              {Object.keys(DIALECTS).map((region) => (
                <button
                  key={region}
                  onClick={() => setDialect(region)}
                  className={dialect === region ? "active-dialect" : ""}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>

          <div className="Intro2Content">
            <div className="Intro2Text">
              <h1>{DIALECTS[dialect].main}</h1>
              <TypingText text={DIALECTS[dialect].typing} />
              <button
                className="start-button"
                onClick={() => navigate("/YoungMain")}
              >
                농지 매칭 시작하기 →
              </button>
              <button className ="start-button" 
                onClick={() => navigate("/SeniorMain")}>어르신</button>
            </div>
            <div className="Intro2Video">
              <video
                src="/Intro-Video.mp4"
                autoPlay
                muted
                loop
                playsInline
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
          </div>
        </section>
        <section className="SectionBlock" data-aos="fade-left">
          <div className="Intro2Content">
            <img src="/OldFarmer.png" alt="고령 농부" className="Intro2Image" />
            <div className="Intro2Text">
              <h2 className="FeatureTitle2">농지를 맡기고 싶은 고령 농업인</h2>
              <p className="FeatureExplain2">
                농지를 계속 관리하기 어려운 상황에서,
                <br />
                믿을 수 있는 청년 농부에게 안전하게 농지를 맡기고 싶으신가요?
                <br />
                신뢰도 기반 매칭과 안전한 서류 확인으로 걱정을 덜어드립니다.
                <br />
                <br />
                농지에 담긴 삶의 가치를 인정하고
                <br />그 마음까지 이어주는 플랫폼, 지금 시작해보세요.
              </p>
            </div>
          </div>
        </section>

        <section className="SectionBlock" data-aos="fade-right">
          <div className="Intro2Content reverse">
            <div className="Intro2Text">
              <h2 className="FeatureTitle2">농지를 찾고 있는 청년 농부</h2>
              <p className="FeatureExplain2">
                땅을 구하기 어려운 청년 농부를 위해,
                <br />
                AI가 예상 수익을 분석하고 적합한 땅을 추천해드립니다.
                <br />
                이제, 안전하게 내 농업의 첫 걸음을 시작해보세요.
                <br />
                <br />
                꿈꿔왔던 귀농의 시작, <br />
                합리적이고 신뢰 가능한 방식으로 연결됩니다.
              </p>
            </div>
            <img src="/YoungFarmer.png" alt="청년 농부" className="Intro2Image" />
          </div>
        </section>

        <section className="SectionBlock" data-aos="fade-left">
          <div className="KeyFeaturesBox2">
            <div className="FeatureHeader2">[Feature Section - #01]</div>
            <div className="FeatureTitle2">Key Features - 판매자</div>
            <div className="FeatureGrid2">
              {sellerFeatures.map((feature, idx) => (
                <div key={idx} className="FeatureCard2">
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    className="FeatureIcon2"
                  />
                  <div className="FeatureContent2">{feature.title}</div>
                  <div className="FeatureExplain2">{feature.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="SectionBlock" data-aos="fade-right">
          <div className="KeyFeaturesBox2">
            <div className="FeatureHeader2">[Feature Section - #02]</div>
            <div className="FeatureTitle2">Key Features - 구매자</div>
            <div className="FeatureGrid2">
              {buyerFeatures.map((feature, idx) => (
                <div key={idx} className="FeatureCard2">
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    className="FeatureIcon2"
                  />
                  <div className="FeatureContent2">{feature.title}</div>
                  <div className="FeatureExplain2">{feature.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="SectionBlock" data-aos="fade-up">
          <h2 className="FeatureTitle2">왜 신뢰 기반 매칭이 중요한가요?</h2>
          <p
            className="FeatureExplain2"
            style={{ maxWidth: "60vw", textAlign: "center" }}
          >
            농지는 단순한 땅이 아닙니다. <br />
            누군가의 인생이 담긴 공간이며, 새로운 시작이 만들어지는 터전입니다.
            <br />
            그렇기 때문에 우리는 농지 매칭에도 '신뢰'라는 기준을 더했습니다.
          </p>
        </section>

        <section className="SectionBlock" data-aos="fade-up">
          <h2 className="FeatureTitle2">간단한 3단계 사용법</h2>
          <div className="FeatureGrid2">
            <div className="FeatureCard2">
              <img src="/icons/upload.png" className="FeatureIcon2" />
              <div className="FeatureContent2">
                1단계: 농지 등록 or 프로필 작성
              </div>
              <div className="FeatureExplain2">
                판매자/구매자 모두 기본 정보를 입력합니다.
              </div>
            </div>
            <div className="FeatureCard2">
              <img src="/icons/match.png" className="FeatureIcon2" />
              <div className="FeatureContent2">2단계: AI 매칭 및 추천 확인</div>
              <div className="FeatureExplain2">
                AI가 신뢰 점수와 조건을 분석하여 자동 추천합니다.
              </div>
            </div>
            <div className="FeatureCard2">
              <img src="/icons/chat.png" className="FeatureIcon2" />
              <div className="FeatureContent2">3단계: 메시지 → 계약</div>
              <div className="FeatureExplain2">
                메시지로 협의 후, 간편 계약서 출력까지 완료!
              </div>
            </div>
          </div>
        </section>

        <section className="SectionBlock" data-aos="fade-up">
          <h2 className="FeatureTitle2">사용자 이야기</h2>
          <div className="FeatureGrid2">
            <div className="FeatureCard2">
              <div className="FeatureContent2">
                “이제 제 땅이 헛되지 않게 되었어요.”
              </div>
              <div className="FeatureExplain2">고령 농부 정○○님, 충남 아산</div>
            </div>
            <div className="FeatureCard2">
              <div className="FeatureContent2">
                “처음 농지를 시작할 수 있었던 건 이 플랫폼 덕분입니다.”
              </div>
              <div className="FeatureExplain2">청년 농부 김○○님, 전북 정읍</div>
            </div>
          </div>
        </section>

        <section className="SectionBlock" data-aos="fade-up">
          <h2 className="FeatureTitle2">청년 농부를 위한 정부 지원 안내</h2>
          <p
            className="FeatureExplain2"
            style={{ maxWidth: "60vw", textAlign: "center" }}
          >
            농림축산식품부의 청년 영농정착 지원사업, 귀농 귀촌 정책 등과
            연계됩니다. <br />
            플랫폼 내에서 신청 가능한 안내도 함께 제공됩니다.
          </p>
        </section>

        <section className="SectionBlock" data-aos="zoom-in">
          <h2 className="FeatureTitle2">지금, 땅의 미래를 함께 그려보세요</h2>
          <button className="start-button" onClick={() => navigate("/YoungMain")}>
            농지 매칭 시작하기 →
          </button>
        </section>
      </div>
    </div>
  );
}

export default IntroPage2;
