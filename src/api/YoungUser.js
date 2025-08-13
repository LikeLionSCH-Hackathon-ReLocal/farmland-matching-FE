// /src/api/YoungUser.js
export const getYoungUserData = async () => {
  // 실제 API가 있으면 fetch로 교체
  const draft = localStorage.getItem("youngUserDraft");
  if (draft) return [JSON.parse(draft)];

  return [
    {
      name: "김철수",
      age: "27",
      sex: "남성",
      mail: "asdf12345@naver.com",
      callNumber: "010-1234-5678",
      profileImage: "/images/youngfarmer_image.png",
      address: "충청남도 아산시 신창면 읍내리 501-26 레자미 5 305호",
      detail: {
        // 원본 객체형(그대로 유지)
        certification: {
          basic: "농업기초과정 수료증",
          smart: "스마트 팜 관련 교육 수료증",
          teach: "농업기술센터 교육 수료증",
          country: "도시 농업 관리사",
          friendly: "유기농업기능사",
          quality: "농산물 품질 관리사",
          mashine: "농업 기계 기사",
          horticulture: "시설 원예 기사",
          license: "농기계 운전 면허",
          educate: "유기농 인증 교육",
        },
        win: {
          start: "귀농 창업 경진 대회 수상이력",
          region: "지역 농업 공모전 참가",
          group: "농업 동아리/단체 활동",
        },
        interest: { apple: "사과", tomato: "토마토", corn: "옥수수" },
        equipment: { track: "트렉터", combine: "콤바인", cut: "예초기" },
        trade: { buy: "토지 매입" },

        // 호환 리스트형(TrustProfile 등에서 바로 사용)
        interestList: ["사과", "토마토", "옥수수"],
        equipmentList: ["트렉터", "콤바인", "예초기"],
        tradesList: ["토지 매입"],
        leasePeriod: "",
        otherTrade: "",

        awardsList: [
          { title: "귀농 창업 경진대회 수상"},
          { title: "지역 농업 공모전 참가"},
          { title: "농업 동아리/단체 활동"},
        ],

        // ✅ 농업 경험
        experience: {
          years: "",
        },

        // 소개 묶음
        intro: {
          OneWord:
            "저는 도시 농업에서 시작해서 귀농을 준비 중입니다. 누구보다 열심히 할 수 있습니다!",
          PullWord:
            "안녕하세요, 저는 **김철수(27세)**라고 합니다.현재 충청남도 아산시 신창면에 거주하고 있으며, 농업 분야에서의 진로를 진지하게 준비 중인 학생입니다. ... (중략) ... 진정성과 성실함으로 보답드리겠습니다.",
          video:
            "https://www.youtube.com/watch?v=XWeF2smYjq8&list=RDXWeF2smYjq8&start_radio=1",
          sns: "kimChulchul27",
          personal: "단체생활",
        },

        // 추천인(원본 구조)
        recommand1: {
          name: "봉미선",
          rel: "대학교 교수님",
          phone: "010-3245-1526 ",
          mail: "misun123@naver.com",
        },
        recommand2: {
          name: "신형만",
          rel: "신창면 마을 이장님",
          phone: "010-6878-4567 ",
          mail: "godhyungman@naver.com",
        },
        recommand3: {
          name: "김영희",
          rel: "아산 국회의원",
          phone: "010-3134-3534",
          mail: "zerohykim125@naver.com",
        },
      },
    },
  ];
};

export const saveYoungUserData = async (user) => {
  // 실제 API 있으면 여기서 POST/PUT 호출
  localStorage.setItem("youngUserDraft", JSON.stringify(user));
  return true;
};
