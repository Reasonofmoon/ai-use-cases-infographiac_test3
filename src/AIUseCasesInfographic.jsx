import React, { useState, useEffect, useCallback } from "react";
import {
  Hexagon,
  Brain,
  Zap,
  Cpu,
  GraduationCap,
  Languages,
  Briefcase,
} from "lucide-react";

const HexagonComponent = React.memo(
  ({ title, color, icon: Icon, onMouseEnter, onMouseLeave, style }) => {
    return (
      <div
        className="absolute transform -translate-x-1/2 -translate-y-1/2"
        style={style}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="group cursor-pointer">
          <Hexagon
            size="100%"
            className="transition-transform group-hover:scale-110"
            style={{
              fill: `url(#gradient-${color})`,
              stroke: color,
              strokeWidth: 2,
            }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Icon className="text-white mb-2" size={24} />
            <span className="text-white text-xs sm:text-sm font-bold text-center px-2">
              {title}
            </span>
          </div>
        </div>
      </div>
    );
  }
);

const Tooltip = React.memo(({ category, position }) => {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (category) {
      setIsTyping(true);
      setDisplayText("");
      const fullText = `${
        category.description
      }\n\n주요 기능:\n${category.items.join("\n")}`;
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < fullText.length) {
          setDisplayText((prev) => prev + fullText.charAt(i));
          i++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, 20);
      return () => clearInterval(typingInterval);
    }
  }, [category]);

  if (!category || !position) return null;

  return (
    <div
      className="absolute bg-white rounded-lg shadow-lg p-3 sm:p-4 w-64 sm:w-72 text-xs sm:text-sm z-20"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(10px, 10px)",
      }}
    >
      <h3 className="font-bold mb-2">{category.title}</h3>
      <p className="whitespace-pre-wrap">{displayText}</p>
      {isTyping && <span className="inline-block animate-pulse">|</span>}
    </div>
  );
});

const AIUseCasesInfographic = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState(null);
  const [size, setSize] = useState(0);

  useEffect(() => {
    const updateSize = () => {
      const minDimension = Math.min(window.innerWidth, window.innerHeight);
      setSize(minDimension * 0.9);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const categories = [
    {
      title: "실용적 활용",
      color: "#FF6B6B",
      icon: Brain,
      description:
        "AI 기술을 일상생활과 비즈니스에 적용하여 효율성을 높이고 사용자 경험을 개선합니다.",
      items: [
        "배달의민족 AI 주문 추천 시스템",
        "AI 기반 이미지 생성 및 편집 도구",
        "스마트홈 기기의 음성 인식 비서",
      ],
    },
    {
      title: "특수 상황 대응",
      color: "#4ECDC4",
      icon: Zap,
      description:
        "복잡하거나 특별한 상황에서 AI의 고급 분석 능력을 활용하여 해결책을 제시합니다.",
      items: [
        "대규모 언어 모델을 통한 복잡한 질문 해결",
        "희귀 질병 진단을 위한 의료 AI 시스템",
        "자연재해 예측 및 대응 AI",
      ],
    },
    {
      title: "기술 지원",
      color: "#45B7D1",
      icon: Cpu,
      description:
        "AI를 활용하여 기술적 문제를 해결하고 소프트웨어 개발 과정을 지원합니다.",
      items: [
        "AI 기반 코드 자동 생성 및 버그 수정",
        "최적화된 알고리즘 추천 시스템",
        "AI 지원 소프트웨어 테스팅 도구",
      ],
    },
    {
      title: "교육 및 설명",
      color: "#FFA07A",
      icon: GraduationCap,
      description:
        "AI를 교육 분야에 적용하여 개인화된 학습 경험을 제공하고 복잡한 개념을 쉽게 설명합니다.",
      items: [
        "AI 튜터를 통한 맞춤형 학습 코스 제공",
        "복잡한 과학 개념의 시각화 및 설명",
        "실시간 언어 번역 및 통역 서비스",
      ],
    },
    {
      title: "언어 및 글쓰기",
      color: "#98D8C8",
      icon: Languages,
      description:
        "자연어 처리 기술을 활용하여 텍스트 생성, 번역, 요약 등 다양한 언어 관련 작업을 수행합니다.",
      items: [
        "AI 기반 문장 구조 및 문법 개선 도구",
        "다국어 자동 번역 시스템",
        "컨텍스트를 고려한 텍스트 요약 기능",
      ],
    },
    {
      title: "전문 지식 지원",
      color: "#F7DC6F",
      icon: Briefcase,
      description:
        "특정 분야의 전문 지식을 AI 시스템에 통합하여 고급 분석과 의사결정을 지원합니다.",
      items: [
        "AI 기반 법률 자문 및 판례 분석 시스템",
        "금융 시장 예측 및 투자 전략 수립 AI",
        "AI를 활용한 신약 개발 및 임상 시험 최적화",
      ],
    },
  ];

  const handleMouseEnter = useCallback((category, event) => {
    setHoveredCategory(category);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredCategory(null);
    setTooltipPosition(null);
  }, []);

  const handleMouseMove = useCallback(
    (event) => {
      if (hoveredCategory) {
        setTooltipPosition({ x: event.clientX, y: event.clientY });
      }
    },
    [hoveredCategory]
  );

  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size * 0.35;
  const hexSize = size * 0.15;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-blue-100 to-purple-100 p-4 overflow-hidden">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-800">
        AI 활용 사례
      </h1>
      <div
        className="relative"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          maxWidth: "100vw",
          maxHeight: "100vh",
        }}
      >
        <svg width="0" height="0">
          {categories.map((category) => (
            <linearGradient
              id={`gradient-${category.color}`}
              key={category.title}
            >
              <stop offset="0%" stopColor={category.color} stopOpacity={0.8} />
              <stop
                offset="100%"
                stopColor={category.color}
                stopOpacity={0.4}
              />
            </linearGradient>
          ))}
        </svg>
        {categories.map((category, index) => {
          const angle = ((Math.PI * 2) / categories.length) * index;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);
          return (
            <HexagonComponent
              key={index}
              {...category}
              onMouseEnter={(e) => handleMouseEnter(category, e)}
              onMouseLeave={handleMouseLeave}
              style={{
                left: `${x}px`,
                top: `${y}px`,
                width: `${hexSize}px`,
                height: `${hexSize}px`,
              }}
            />
          );
        })}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Hexagon
            size={hexSize * 1.2}
            className="text-gray-800 fill-current"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-sm sm:text-base font-bold text-center">
              AI 활용
              <br />
              사례
            </span>
          </div>
        </div>
      </div>
      <Tooltip category={hoveredCategory} position={tooltipPosition} />
    </div>
  );
};

export default AIUseCasesInfographic;
