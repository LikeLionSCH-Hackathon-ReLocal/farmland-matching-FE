// 추후 fetch 또는 axios 요청으로 변경 가능
export const getFarmlandData = async () => {
  return [
    {
      id: 1,
      lat: 36.73346211098126,
      lng: 126.9614054010663,
      emoji: "🍎",
      name: "아산 1번 농지",
      address: "충남 아산시 신창면",
      crop: "사과",
      area: 863,
      price: 13376,
      detail: {
        landInfo: {
          crop: "사과",
          areaHectare: "0.9ha",
          location: "충남 아산시 신창면 북수리 858-4",
          landNumber: "631-4",
          soilType: "사질양토",
          waterSource: "인근 하천과 연결됨",
          owner: "이말순 (75세)",
        },
        aiProfit: {
          yearlyProfit: "약 5,176,600원 / 년",
          yield: "약 4,706kg",
          unitPrice: "평균 1,100원/kg",
          cost: {
            material: "750,000원",
            labor: "1,200,000원",
            machine: "420,000원",
          },
          netProfit: "2,806,600원 ± 12%",
        },
        trustMatch: {
          status: "매칭 대기 중",
          preferences: ["배 재배 경험 우대", "인근 거주자 선호"],
          waitingYouth: 2,
        },
        sellerComment:
          "마을 사람들과 함께 일구던 밭이에요. 공동체를 소중히 여기는 분이었으면 해요.",
      },
    },

    {
      id: 2,
      lat: 36.75462730525279,
      lng: 126.95386660980297,
      emoji: "🌽",
      name: "아산 2번 농지",
      address: "충남 아산시 배방읍",
      crop: "사과",
      area: 878,
      price: 6231,
      detail: {
        landInfo: {
          crop: "사과",
          areaHectare: "0.9ha",
          location: "충남 아산시 배방읍 북수리 862-6",
          landNumber: "840-3",
          soilType: "식양토",
          waterSource: "관개 시설 있음",
          owner: "이말순 (75세)",
        },
        aiProfit: {
          yearlyProfit: "약 5,056,700원 / 년",
          yield: "약 4,597kg",
          unitPrice: "평균 1,100원/kg",
          cost: {
            material: "750,000원",
            labor: "1,200,000원",
            machine: "420,000원",
          },
          netProfit: "2,686,700원 ± 12%",
        },
        trustMatch: {
          status: "매칭 대기 중",
          preferences: ["기계 운전 가능자 우대", "장기 계약 가능자 우대"],
          waitingYouth: 5,
        },
        sellerComment:
          "내 아버지께서 물려주신 땅이에요. 정성껏 가꿔줄 분이 오셨으면 좋겠어요.",
      },
    },

    {
      id: 3,
      lat: 36.739885958939375,
      lng: 126.98407712680722,
      emoji: "🍓",
      name: "아산 3번 농지",
      address: "충남 아산시 염치읍",
      crop: "감자",
      area: 582,
      price: 19849,
      detail: {
        landInfo: {
          crop: "감자",
          areaHectare: "0.6ha",
          location: "충남 아산시 염치읍 북수리 268-3",
          landNumber: "292-5",
          soilType: "점질토",
          waterSource: "근처 지하수 관정 있음",
          owner: "최옥자 (70세)",
        },
        aiProfit: {
          yearlyProfit: "약 5,392,800원 / 년",
          yield: "약 4,494kg",
          unitPrice: "평균 1,200원/kg",
          cost: {
            material: "750,000원",
            labor: "1,200,000원",
            machine: "420,000원",
          },
          netProfit: "3,022,800원 ± 12%",
        },
        trustMatch: {
          status: "매칭 대기 중",
          preferences: ["벼농사 경험 선호", "인근 거주자 선호"],
          waitingYouth: 4,
        },
        sellerComment:
          "이 밭은 내가 남편이랑 30년 넘게 같이 가꾼 땅이에요. 사람 좋은 젊은이가 와서 잘 이어갔으면 해요. 돈보다 마음이 가는 사람이었으면 좋겠어",
      },
    },

    {
      id: 4,
      lat: 36.78137789452141,
      lng: 126.96923090595396,
      emoji: "🍎",
      name: "아산 4번 농지",
      address: "충남 아산시 신창면",
      crop: "토마토",
      area: 505,
      price: 18192,
      detail: {
        landInfo: {
          crop: "토마토",
          areaHectare: "0.5ha",
          location: "충남 아산시 신창면 북수리 838-5",
          landNumber: "921-6",
          soilType: "점질토",
          waterSource: "근처 지하수 관정 있음",
          owner: "정복례 (73세)",
        },
        aiProfit: {
          yearlyProfit: "약 3,372,600원 / 년",
          yield: "약 3,066kg",
          unitPrice: "평균 1,100원/kg",
          cost: {
            material: "750,000원",
            labor: "1,200,000원",
            machine: "420,000원",
          },
          netProfit: "1,002,600원 ± 12%",
        },
        trustMatch: {
          status: "매칭 대기 중",
          preferences: ["배 재배 경험 우대", "정직한 성격 중요"],
          waitingYouth: 2,
        },
        sellerComment:
          "한 해도 거르지 않고 경작해온 땅이에요. 건강한 마음으로 농사짓는 분을 기다려요.",
      },
    },

    {
      id: 5,
      lat: 36.76094126082588,
      lng: 126.96391179475143,
      emoji: "🍎",
      name: "아산 5번 농지",
      address: "충남 아산시 도고면",
      crop: "감자",
      area: 429,
      price: 15534,
      detail: {
        landInfo: {
          crop: "감자",
          areaHectare: "0.4ha",
          location: "충남 아산시 도고면 북수리 645-3",
          landNumber: "767-5",
          soilType: "식양토",
          waterSource: "근처 지하수 관정 있음",
          owner: "김순복 (72세)",
        },
        aiProfit: {
          yearlyProfit: "약 5,423,600원 / 년",
          yield: "약 4,172kg",
          unitPrice: "평균 1,300원/kg",
          cost: {
            material: "750,000원",
            labor: "1,200,000원",
            machine: "420,000원",
          },
          netProfit: "3,053,600원 ± 12%",
        },
        trustMatch: {
          status: "매칭 대기 중",
          preferences: ["벼농사 경험 선호", "장기 계약 가능자 우대"],
          waitingYouth: 2,
        },
        sellerComment:
          "내 아버지께서 물려주신 땅이에요. 정성껏 가꿔줄 분이 오셨으면 좋겠어요.",
      },
    },

    {
      id: 6,
      lat: 36.771525901078874,
      lng: 126.94564934449474,
      emoji: "🍎",
      name: "아산 6번 농지",
      address: "충남 아산시 배방읍",
      crop: "토마토",
      area: 345,
      price: 10912,
      detail: {
        landInfo: {
          crop: "토마토",
          areaHectare: "0.3ha",
          location: "충남 아산시 배방읍 북수리 849-6",
          landNumber: "519-9",
          soilType: "점질토",
          waterSource: "관개 시설 있음",
          owner: "최옥자 (70세)",
        },
        aiProfit: {
          yearlyProfit: "약 4,373,600원 / 년",
          yield: "약 3,976kg",
          unitPrice: "평균 1,100원/kg",
          cost: {
            material: "750,000원",
            labor: "1,200,000원",
            machine: "420,000원",
          },
          netProfit: "2,003,600원 ± 12%",
        },
        trustMatch: {
          status: "매칭 대기 중",
          preferences: ["기계 운전 가능자 우대", "정직한 성격 중요"],
          waitingYouth: 2,
        },
        sellerComment:
          "한 해도 거르지 않고 경작해온 땅이에요. 건강한 마음으로 농사짓는 분을 기다려요.",
      },
    },

    {
      id: 7,
      lat: 36.768736444259694,
      lng: 126.96255752759119,
      emoji: "🍅",
      name: "아산 7번 농지",
      address: "충남 아산시 배방읍",
      crop: "감자",
      area: 531,
      price: 17154,
      detail: {
        landInfo: {
          crop: "감자",
          areaHectare: "0.5ha",
          location: "충남 아산시 배방읍 북수리 580-7",
          landNumber: "759-2",
          soilType: "사질양토",
          waterSource: "근처 지하수 관정 있음",
          owner: "박영희 (68세)",
        },
        aiProfit: {
          yearlyProfit: "약 6,816,600원 / 년",
          yield: "약 4,869kg",
          unitPrice: "평균 1,400원/kg",
          cost: {
            material: "750,000원",
            labor: "1,200,000원",
            machine: "420,000원",
          },
          netProfit: "4,446,600원 ± 12%",
        },
        trustMatch: {
          status: "매칭 대기 중",
          preferences: ["벼농사 경험 선호", "인근 거주자 선호"],
          waitingYouth: 4,
        },
        sellerComment:
          "한 해도 거르지 않고 경작해온 땅이에요. 건강한 마음으로 농사짓는 분을 기다려요.",
      },
    },

    {
      id: 8,
      lat: 36.76988516101737,
      lng: 126.93949365197304,
      emoji: "🌽",
      name: "아산 8번 농지",
      address: "충남 아산시 도고면",
      crop: "벼",
      area: 546,
      price: 10473,
      detail: {
        landInfo: {
          crop: "벼",
          areaHectare: "0.5ha",
          location: "충남 아산시 도고면 북수리 324-8",
          landNumber: "656-3",
          soilType: "사질양토",
          waterSource: "관개 시설 있음",
          owner: "최옥자 (70세)",
        },
        aiProfit: {
          yearlyProfit: "약 5,775,900원 / 년",
          yield: "약 4,443kg",
          unitPrice: "평균 1,300원/kg",
          cost: {
            material: "750,000원",
            labor: "1,200,000원",
            machine: "420,000원",
          },
          netProfit: "3,405,900원 ± 12%",
        },
        trustMatch: {
          status: "매칭 대기 중",
          preferences: ["배 재배 경험 우대", "정직한 성격 중요"],
          waitingYouth: 1,
        },
        sellerComment:
          "이 밭은 내가 남편이랑 30년 넘게 같이 가꾼 땅이에요. 사람 좋은 젊은이가 와서 잘 이어갔으면 해요. 돈보다 마음이 가는 사람이었으면 좋겠어",
      },
    },

    {
      id: 9,
      lat: 36.76347033215937,
      lng: 126.95572622152018,
      emoji: "🍅",
      name: "아산 9번 농지",
      address: "충남 아산시 신창면",
      crop: "토마토",
      area: 799,
      price: 19403,
      detail: {
        landInfo: {
          crop: "토마토",
          areaHectare: "0.8ha",
          location: "충남 아산시 신창면 북수리 457-8",
          landNumber: "131-7",
          soilType: "식양토",
          waterSource: "근처 지하수 관정 있음",
          owner: "박영희 (68세)",
        },
        aiProfit: {
          yearlyProfit: "약 4,607,400원 / 년",
          yield: "약 3,291kg",
          unitPrice: "평균 1,400원/kg",
          cost: {
            material: "750,000원",
            labor: "1,200,000원",
            machine: "420,000원",
          },
          netProfit: "2,237,400원 ± 12%",
        },
        trustMatch: {
          status: "매칭 대기 중",
          preferences: ["기계 운전 가능자 우대", "인근 거주자 선호"],
          waitingYouth: 4,
        },
        sellerComment:
          "이 밭은 희망의 땅이에요. 젊은이의 꿈이 자라나길 바라요.",
      },
    },

    {
      id: 10,
      lat: 36.754458098847564,
      lng: 126.95555183722246,
      emoji: "🥔",
      name: "아산 10번 농지",
      address: "충남 아산시 도고면",
      crop: "감자",
      area: 305,
      price: 5031,
      detail: {
        landInfo: {
          crop: "감자",
          areaHectare: "0.3ha",
          location: "충남 아산시 도고면 북수리 254-9",
          landNumber: "697-2",
          soilType: "점질토",
          waterSource: "근처 지하수 관정 있음",
          owner: "이말순 (75세)",
        },
        aiProfit: {
          yearlyProfit: "약 3,740,000원 / 년",
          yield: "약 3,400kg",
          unitPrice: "평균 1,100원/kg",
          cost: {
            material: "750,000원",
            labor: "1,200,000원",
            machine: "420,000원",
          },
          netProfit: "1,370,000원 ± 12%",
        },
        trustMatch: {
          status: "매칭 대기 중",
          preferences: ["벼농사 경험 선호", "장기 계약 가능자 우대"],
          waitingYouth: 5,
        },
        sellerComment:
          "내 아버지께서 물려주신 땅이에요. 정성껏 가꿔줄 분이 오셨으면 좋겠어요.",
      },
    },

    {
      id: 11,
      lat: 36.735430495776264,
      lng: 126.97551215393646,
      emoji: "🍓",
      name: "아산 11번 농지",
      address: "충남 아산시 신창면",
      crop: "감자",
      area: 800,
      price: 6675,
      detail: {
        landInfo: {
          crop: "감자",
          areaHectare: "0.8ha",
          location: "충남 아산시 신창면 북수리 727-2",
          landNumber: "653-9",
          soilType: "점질토",
          waterSource: "관개 시설 있음",
          owner: "최옥자 (70세)",
        },
        aiProfit: {
          yearlyProfit: "약 4,186,000원 / 년",
          yield: "약 3,220kg",
          unitPrice: "평균 1,300원/kg",
          cost: {
            material: "750,000원",
            labor: "1,200,000원",
            machine: "420,000원",
          },
          netProfit: "1,816,000원 ± 12%",
        },
        trustMatch: {
          status: "매칭 대기 중",
          preferences: ["기계 운전 가능자 우대", "장기 계약 가능자 우대"],
          waitingYouth: 2,
        },
        sellerComment:
          "마을 사람들과 함께 일구던 밭이에요. 공동체를 소중히 여기는 분이었으면 해요.",
      },
    },

    {
      id: 12,
      lat: 36.76369467412913,
      lng: 126.94698267515548,
      emoji: "🍓",
      name: "아산 12번 농지",
      address: "충남 아산시 도고면",
      crop: "사과",
      area: 562,
      price: 14707,
      detail: {
        landInfo: {
          crop: "사과",
          areaHectare: "0.6ha",
          location: "충남 아산시 도고면 북수리 672-5",
          landNumber: "133-9",
          soilType: "점질토",
          waterSource: "근처 지하수 관정 있음",
          owner: "김순복 (72세)",
        },
        aiProfit: {
          yearlyProfit: "약 5,807,100원 / 년",
          yield: "약 4,467kg",
          unitPrice: "평균 1,300원/kg",
          cost: {
            material: "750,000원",
            labor: "1,200,000원",
            machine: "420,000원",
          },
          netProfit: "3,437,100원 ± 12%",
        },
        trustMatch: {
          status: "매칭 대기 중",
          preferences: ["기계 운전 가능자 우대", "인근 거주자 선호"],
          waitingYouth: 2,
        },
        sellerComment:
          "마을 사람들과 함께 일구던 밭이에요. 공동체를 소중히 여기는 분이었으면 해요.",
      },
    },

    {
      id: 13,
      lat: 36.7750620049189,
      lng: 126.96717042994477,
      emoji: "🥔",
      name: "아산 13번 농지",
      address: "충남 아산시 염치읍",
      crop: "토마토",
      area: 418,
      price: 8587,
      detail: {
        landInfo: {
          crop: "토마토",
          areaHectare: "0.4ha",
          location: "충남 아산시 염치읍 북수리 218-7",
          landNumber: "982-4",
          soilType: "점질토",
          waterSource: "근처 지하수 관정 있음",
          owner: "이말순 (75세)",
        },
        aiProfit: {
          yearlyProfit: "약 3,787,200원 / 년",
          yield: "약 3,156kg",
          unitPrice: "평균 1,200원/kg",
          cost: {
            material: "750,000원",
            labor: "1,200,000원",
            machine: "420,000원",
          },
          netProfit: "1,417,200원 ± 12%",
        },
        trustMatch: {
          status: "매칭 대기 중",
          preferences: ["배 재배 경험 우대", "장기 계약 가능자 우대"],
          waitingYouth: 4,
        },
        sellerComment:
          "한 해도 거르지 않고 경작해온 땅이에요. 건강한 마음으로 농사짓는 분을 기다려요.",
      },
    },

    {
      id: 14,
      lat: 36.77144275195268,
      lng: 126.98681618434122,
      emoji: "🍎",
      name: "아산 14번 농지",
      address: "충남 아산시 도고면",
      crop: "사과",
      area: 720,
      price: 16954,
      detail: {
        landInfo: {
          crop: "사과",
          areaHectare: "0.7ha",
          location: "충남 아산시 도고면 북수리 156-7",
          landNumber: "266-9",
          soilType: "점질토",
          waterSource: "인근 하천과 연결됨",
          owner: "최옥자 (70세)",
        },
        aiProfit: {
          yearlyProfit: "약 3,616,800원 / 년",
          yield: "약 3,288kg",
          unitPrice: "평균 1,100원/kg",
          cost: {
            material: "750,000원",
            labor: "1,200,000원",
            machine: "420,000원",
          },
          netProfit: "1,246,800원 ± 12%",
        },
        trustMatch: {
          status: "매칭 대기 중",
          preferences: ["기계 운전 가능자 우대", "정직한 성격 중요"],
          waitingYouth: 4,
        },
        sellerComment:
          "한 해도 거르지 않고 경작해온 땅이에요. 건강한 마음으로 농사짓는 분을 기다려요.",
      },
    },

    {
      id: 15,
      lat: 36.78898102906144,
      lng: 126.98087715229704,
      emoji: "🍅",
      name: "아산 15번 농지",
      address: "충남 아산시 신창면",
      crop: "감자",
      area: 493,
      price: 9116,
      detail: {
        landInfo: {
          crop: "감자",
          areaHectare: "0.5ha",
          location: "충남 아산시 신창면 북수리 809-1",
          landNumber: "812-2",
          soilType: "사질양토",
          waterSource: "인근 하천과 연결됨",
          owner: "최옥자 (70세)",
        },
        aiProfit: {
          yearlyProfit: "약 3,837,900원 / 년",
          yield: "약 3,489kg",
          unitPrice: "평균 1,100원/kg",
          cost: {
            material: "750,000원",
            labor: "1,200,000원",
            machine: "420,000원",
          },
          netProfit: "1,467,900원 ± 12%",
        },
        trustMatch: {
          status: "매칭 대기 중",
          preferences: ["벼농사 경험 선호", "정직한 성격 중요"],
          waitingYouth: 2,
        },
        sellerComment:
          "내 아버지께서 물려주신 땅이에요. 정성껏 가꿔줄 분이 오셨으면 좋겠어요.",
      },
    },

    {
      id: 16,
      lat: 36.75703595594029,
      lng: 126.96882310368045,
      emoji: "🍅",
      name: "아산 16번 농지",
      address: "충남 아산시 도고면",
      crop: "벼",
      area: 737,
      price: 12165,
      detail: {
        landInfo: {
          crop: "벼",
          areaHectare: "0.7ha",
          location: "충남 아산시 도고면 북수리 191-8",
          landNumber: "435-1",
          soilType: "점질토",
          waterSource: "인근 하천과 연결됨",
          owner: "정복례 (73세)",
        },
        aiProfit: {
          yearlyProfit: "약 3,865,200원 / 년",
          yield: "약 3,221kg",
          unitPrice: "평균 1,200원/kg",
          cost: {
            material: "750,000원",
            labor: "1,200,000원",
            machine: "420,000원",
          },
          netProfit: "1,495,200원 ± 12%",
        },
        trustMatch: {
          status: "매칭 대기 중",
          preferences: ["배 재배 경험 우대", "장기 계약 가능자 우대"],
          waitingYouth: 4,
        },
        sellerComment:
          "이 밭은 내가 남편이랑 30년 넘게 같이 가꾼 땅이에요. 사람 좋은 젊은이가 와서 잘 이어갔으면 해요. 돈보다 마음이 가는 사람이었으면 좋겠어",
      },
    },

    {
      id: 17,
      lat: 36.753042548939625,
      lng: 126.95355189763283,
      emoji: "🍅",
      name: "아산 17번 농지",
      address: "충남 아산시 배방읍",
      crop: "벼",
      area: 476,
      price: 15080,
      detail: {
        landInfo: {
          crop: "벼",
          areaHectare: "0.5ha",
          location: "충남 아산시 배방읍 북수리 334-4",
          landNumber: "787-7",
          soilType: "점질토",
          waterSource: "관개 시설 있음",
          owner: "정복례 (73세)",
        },
        aiProfit: {
          yearlyProfit: "약 5,337,800원 / 년",
          yield: "약 4,106kg",
          unitPrice: "평균 1,300원/kg",
          cost: {
            material: "750,000원",
            labor: "1,200,000원",
            machine: "420,000원",
          },
          netProfit: "2,967,800원 ± 12%",
        },
        trustMatch: {
          status: "매칭 대기 중",
          preferences: ["기계 운전 가능자 우대", "정직한 성격 중요"],
          waitingYouth: 3,
        },
        sellerComment:
          "이 밭은 희망의 땅이에요. 젊은이의 꿈이 자라나길 바라요.",
      },
    },

    {
      id: 18,
      lat: 36.78443059174156,
      lng: 126.96038691458584,
      emoji: "🥔",
      name: "아산 18번 농지",
      address: "충남 아산시 도고면",
      crop: "감자",
      area: 508,
      price: 8129,
      detail: {
        landInfo: {
          crop: "감자",
          areaHectare: "0.5ha",
          location: "충남 아산시 도고면 북수리 814-7",
          landNumber: "889-5",
          soilType: "식양토",
          waterSource: "인근 하천과 연결됨",
          owner: "박영희 (68세)",
        },
        aiProfit: {
          yearlyProfit: "약 4,525,200원 / 년",
          yield: "약 3,771kg",
          unitPrice: "평균 1,200원/kg",
          cost: {
            material: "750,000원",
            labor: "1,200,000원",
            machine: "420,000원",
          },
          netProfit: "2,155,200원 ± 12%",
        },
        trustMatch: {
          status: "매칭 대기 중",
          preferences: ["기계 운전 가능자 우대", "인근 거주자 선호"],
          waitingYouth: 2,
        },
        sellerComment:
          "한 해도 거르지 않고 경작해온 땅이에요. 건강한 마음으로 농사짓는 분을 기다려요.",
      },
    },

    {
      id: 19,
      lat: 36.785554406971606,
      lng: 126.96194231065833,
      emoji: "🌽",
      name: "아산 19번 농지",
      address: "충남 아산시 도고면",
      crop: "옥수수",
      area: 478,
      price: 14028,
      detail: {
        landInfo: {
          crop: "옥수수",
          areaHectare: "0.5ha",
          location: "충남 아산시 도고면 북수리 845-6",
          landNumber: "543-7",
          soilType: "점질토",
          waterSource: "근처 지하수 관정 있음",
          owner: "최옥자 (70세)",
        },
        aiProfit: {
          yearlyProfit: "약 5,882,400원 / 년",
          yield: "약 4,902kg",
          unitPrice: "평균 1,200원/kg",
          cost: {
            material: "750,000원",
            labor: "1,200,000원",
            machine: "420,000원",
          },
          netProfit: "3,512,400원 ± 12%",
        },
        trustMatch: {
          status: "매칭 대기 중",
          preferences: ["배 재배 경험 우대", "정직한 성격 중요"],
          waitingYouth: 5,
        },
        sellerComment:
          "이 밭은 희망의 땅이에요. 젊은이의 꿈이 자라나길 바라요.",
      },
    },

    {
      id: 20,
      lat: 36.738386276526185,
      lng: 126.97060096263462,
      emoji: "🍅",
      name: "아산 20번 농지",
      address: "충남 아산시 신창면",
      crop: "사과",
      area: 841,
      price: 18547,
      detail: {
        landInfo: {
          crop: "사과",
          areaHectare: "0.8ha",
          location: "충남 아산시 신창면 북수리 291-1",
          landNumber: "875-4",
          soilType: "식양토",
          waterSource: "관개 시설 있음",
          owner: "정복례 (73세)",
        },
        aiProfit: {
          yearlyProfit: "약 4,965,600원 / 년",
          yield: "약 4,138kg",
          unitPrice: "평균 1,200원/kg",
          cost: {
            material: "750,000원",
            labor: "1,200,000원",
            machine: "420,000원",
          },
          netProfit: "2,595,600원 ± 12%",
        },
        trustMatch: {
          status: "매칭 대기 중",
          preferences: ["배 재배 경험 우대", "정직한 성격 중요"],
          waitingYouth: 4,
        },
        sellerComment:
          "이 밭은 희망의 땅이에요. 젊은이의 꿈이 자라나길 바라요.",
      },
    },
  ];
};





/* 추후 서버 연동을 위한 데이터 fetch mock 함수
// farmland.js
export const getFarmlandData = async () => {
  const res = await fetch("/api/farmlands"); // 또는 axios.get(...)
  if (!res.ok) throw new Error("농지 데이터 요청 실패");
  return await res.json();
};
*/ 