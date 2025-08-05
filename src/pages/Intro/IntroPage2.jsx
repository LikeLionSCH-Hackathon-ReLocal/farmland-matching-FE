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
    icon: "/icons/seller_Features1.png",
  },
  {
    title: "안심 소통 시스템",
    desc: "연락처 노출 없이 초기 대화 가능",
    icon: "/icons/seller_Features2.png",
  },
  {
    title: "AI 농업자 추천",
    desc: "내 땅과 어울리는 청년 농부 자동 매칭",
    icon: "/icons/seller_Features3.png",
  },
  {
    title: "기본 계약서 자동 생성",
    desc: "자동 문서화 및 출력 기능 제공",
    icon: "/icons/seller_Features4.png",
  },
  {
    title: "농지 히스토리 소개",
    desc: "내 땅의 이야기를 글/사진으로 등록 가능",
    icon: "/icons/seller_Features5.png",
  },
  {
    title: "인증 기반 거래",
    desc: "실명/자격 기반 매칭으로 신뢰 보장",
    icon: "/icons/seller_Features6.png",
  },
];

const buyerFeatures = [
  {
    title: "지도 기반 농지 탐색",
    desc: "지역별로 관심 농지를 시각적으로 탐색",
    icon: "/icons_purchase/purchase_Features1.png",
  },
  {
    title: "1년 예상 수익 시뮬레이션",
    desc: "작물 선택 시 수익 확인",
    icon: "/icons_purchase/purchase_Features2.png",
  },
  {
    title: "나의 농업 프로필 등록",
    desc: "자격증, 수료증, 희망 작물 등 입력",
    icon: "/icons_purchase/purchase_Features3.png",
  },
  {
    title: "실명 인증 및 이력 검증",
    desc: "구매자 신뢰도를 위한 인증 시스템",
    icon: "/icons_purchase/purchase_Features4.png",
  },
  {
    title: "판매자에게 질문하기",
    desc: "내조건, 토양, 위치 등 실시간 문의",
    icon: "/icons_purchase/purchase_Features5.png",
  },
  {
    title: "맞춤형 농지 추천",
    desc: "나의 조건과 맞는 땅을 자동 추천",
    icon: "/icons_purchase/purchase_Features6.png",
  },
];

const userStories = [
  {
    quote: "우리 땅을 이해해주는 사람이 생겼어요.",
    name: "고령 농부 이○○님, 경북 안동",
    detail:
      "오래된 논이라서 찾는 사람이 없을 줄 알았는데, 플랫폼 덕분에 이력을 보고 관심 가진 청년이 나타났어요. 마음 놓고 넘길 수 있었죠.",
  },
  {
    quote: "매칭도 빠르고, 과정도 투명했어요.",
    name: "중장년 농부 박○○님, 충남 예산",
    detail:
      "처음엔 걱정했는데, 생각보다 신뢰 기반 시스템이 잘 되어 있어서 안심하고 농지를 매칭할 수 있었습니다.",
  },
  {
    quote: "나 같은 초보도 시작할 수 있었어요.",
    name: "귀농 준비자 김○○님, 서울 → 전남 보성",
    detail:
      "도시에서 직장생활하다 귀농을 결심했어요. 플랫폼에서 수익 예측도 해주고, 인증도 도와줘서 첫 발을 내딛을 수 있었어요.",
  },
  {
    quote: "드디어 내 농업의 첫걸음을 뗐습니다.",
    name: "청년 농부 정○○님, 전북 김제",
    detail:
      "지도를 보며 원하는 위치를 찾을 수 있었고, 프로필을 등록하자 바로 추천 매칭이 왔습니다. 지금은 그 땅에서 열심히 농사 중이에요.",
  },
  {
    quote: "여성도 믿고 시작할 수 있었어요.",
    name: "여성 농부 최○○님, 강원 평창",
    detail:
      "시골에서 혼자 시작하는 게 걱정이었는데, 플랫폼에서 조건 확인도 되고 소통도 안심되게 되어 있어서 큰 힘이 됐습니다.",
  },
  {
    quote: "이야기를 듣고 내 땅에 관심을 가져주더라고요.",
    name: "고령 농부 윤○○님, 충북 제천",
    detail:
      "우리 땅에 담긴 추억과 사진을 올려뒀더니, 청년 농부가 '이런 땅을 찾고 있었다'며 연락을 주더군요. 뭉클했습니다.",
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
                className="Intro2start-button"
                onClick={() => navigate("/YoungMain")}
              >
                농지를 찾는 청년 / 중장년 농업인
              </button>
              <button
                className="Intro2start-button"
                onClick={() => navigate("/SeniorMain")}
              >
                농지를 맡기고 싶은 고령 농업인
              </button>
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
            <img
              src="/Farmer/OldFarmer.png"
              alt="고령 농부"
              className="Intro2Image"
            />
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
            <img
              src="/Farmer/YoungFarmer.png"
              alt="청년 농부"
              className="Intro2Image"
            />
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
        </section>

        <section className="SectionBlock" data-aos="fade-up">
          <div className="FeatureGrid2_1">
            <div className="FeatureCard2_1">
              <img src="Instruction1.png" className="FeatureIcon2_1" />
              <div className="FeatureContent2_1">
                1단계: 농지 등록 or 프로필 작성
              </div>
              <div className="FeatureExplain2_1">
                판매자/구매자 모두 기본 정보를 입력합니다.
              </div>
              <div className="FeatureDetail2_1">
                이름, 연락처, 재배 작물, 거래 희망 조건 등 필수 정보를 <br />
                간편하게 입력하면, AI 매칭을 위한 준비가 완료됩니다.
              </div>
            </div>
          </div>
        </section>

        <section className="SectionBlock" data-aos="fade-up">
          <div className="FeatureGrid2_1">
            <div className="FeatureCard2_1">
              <img src="Instruction2.png" className="FeatureIcon2_1" />
              <div className="FeatureContent2_1">
                2단계: AI 매칭 및 추천 확인
              </div>
              <div className="FeatureExplain2_1">
                AI가 신뢰 점수와 조건을 분석하여 자동 추천합니다.
              </div>
              <div className="FeatureDetail2_1">
                입력한 정보를 바탕으로 가장 적합한 상대를 추천받습니다.
                <br />
                조건 필터도 직접 설정 가능하여 내가 원하는 매칭만 받아볼 수
                있어요.
              </div>
            </div>
          </div>
        </section>

        <section className="SectionBlock" data-aos="fade-up">
          <div className="FeatureGrid2_1">
            <div className="FeatureCard2_1">
              <img src="Instruction3.png" className="FeatureIcon2_1" />
              <div className="FeatureContent2_1">3단계: 메시지 → 계약</div>
              <div className="FeatureExplain2_1">
                메시지로 협의 후, 간편 계약서 출력까지 완료!
              </div>
              <div className="FeatureDetail2_1">
                실명 인증된 상대방과 메시지를 통해 상세 조건을 조율하고, <br />
                플랫폼에서 계약서 자동 생성 및 출력이 가능합니다.
              </div>
            </div>
          </div>
        </section>

        <section className="SectionBlock" data-aos="fade-up">
          <h2 className="FeatureTitle2">사용자 이야기</h2>
          <div className="FeatureGrid2">
            {userStories.map((story, idx) => (
              <div key={idx} className="FeatureCard2 hover-expand">
                <div className="FeatureContent2">“{story.quote}”</div>
                <div className="FeatureExplain2">{story.name}</div>
                <div className="FeatureDetail2">{story.detail}</div>
              </div>
            ))}
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
          <button
            className="start-button"
            onClick={() => navigate("/YoungMain")}
          >
            농지에서 새로운 시작을 하고 싶어요
          </button>
          <button
            className="start-button"
            onClick={() => navigate("/SeniorMain")}
          >
            내 농지를 믿고 맡길 청년을 찾고 싶어요
          </button>
        </section>
      </div>
    </div>
  );
}

export default IntroPage2;
