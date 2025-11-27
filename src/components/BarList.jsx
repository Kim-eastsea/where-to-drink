import styled from "@emotion/styled";
import MOCK_DATA from "../constant/mock";
import { useMemo, useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { Wheel } from "react-custom-roulette";

// 룰렛 게임 컴포넌트
const RouletteGame = ({ data, language, randomSeed, onSpinEnd }) => {
  const rouletteData = useMemo(() => {
    const colors = ["#ff7272", "#77c6ff", "#ffd084", "#71ff9c", "#e2beff"];
    return Array.from({ length: 25 }).map((_, index) => ({
      option: "",
      style: {
        backgroundColor: colors[index % colors.length],
        textColor: "white",
      },
    }));
  }, []);

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [finalBar, setFinalBar] = useState(null);

  const finalResultRef = useRef(null);

  // 오디오 객체
  const audioRef = useRef(null);
  useEffect(() => {
    audioRef.current = new Audio("/sound/roulette.mp3");
  }, []);

  const isGameFinishedRef = useRef(false);
  const startupTimerRef = useRef(null);

  useEffect(() => {
    if (randomSeed === 0 || data.length === 0) return;

    confetti.reset();
    isGameFinishedRef.current = false;

    const realPrizeIndex = Math.floor(randomSeed * data.length);
    finalResultRef.current = data[realPrizeIndex];

    const visualPrizeIndex = Math.floor(Math.random() * 25);

    startupTimerRef.current = setTimeout(() => {
      if (isGameFinishedRef.current) return;

      setPrizeNumber(visualPrizeIndex);

      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current
          .play()
          .catch((e) => console.log("Sound play error:", e));
      }

      setMustSpin(true);
    }, 50);

    return () => {
      if (startupTimerRef.current) clearTimeout(startupTimerRef.current);

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      confetti.reset();
    };
  }, []);

  const handleStopSpinning = () => {
    if (isGameFinishedRef.current) return;

    finishGame();
  };

  // 스킵 기능
  const handleSkip = () => {
    if (isGameFinishedRef.current) return;

    if (startupTimerRef.current) {
      clearTimeout(startupTimerRef.current);
    }

    setMustSpin(false);
    finishGame();
  };

  // 게임 종료 및 결과 표시 처리
  const finishGame = () => {
    isGameFinishedRef.current = true;

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    setFinalBar(finalResultRef.current);
    setShowResult(true);

    // 파티클 효과
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#f55e6b", "#54a4dd", "#f5a623", "#ffffff", "#ffd700"],
    });

    if (onSpinEnd) onSpinEnd();
  };

  // 결과 화면
  if (showResult && finalBar) {
    return (
      <Container>
        <RestaurantItem>
          <img src={finalBar.img_url} alt={finalBar.name} />
          <h3>{finalBar.name}</h3>
          {language === "Kor" ? (
            <p>
              {finalBar.kor_loc} | {finalBar.kor_mood.join(", ")}
              <br />
              {finalBar.kor_food.join(", ")}
              <br />
              <MapBtn
                href={finalBar.web_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/img/navermap.png" alt="네이버지도" />
              </MapBtn>
              <br />
              <span>{finalBar.kor_hashtag.join(" ")}</span>
            </p>
          ) : (
            <p>
              {finalBar.eng_loc} | {finalBar.eng_mood.join(", ")}
              <br />
              {finalBar.eng_food.join(", ")}
              <br />
              <MapBtn
                href={finalBar.web_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/img/navermap.png" alt="네이버지도" />
              </MapBtn>
              <br />
              <span>{finalBar.eng_hashtag.join(" ")}</span>
            </p>
          )}
        </RestaurantItem>
      </Container>
    );
  }

  // 룰렛 화면
  return (
    <Container onClick={handleSkip} style={{ cursor: "pointer" }}>
      <WheelContainer>
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={rouletteData}
          onStopSpinning={handleStopSpinning}
          backgroundColors={["#3e3e3e", "#df3428"]}
          textColors={["#ffffff"]}
          outerBorderColor="#333"
          outerBorderWidth={3}
          innerRadius={15}
          innerBorderColor="#333"
          innerBorderWidth={0}
          radiusLineColor="transparent"
          radiusLineWidth={0}
          fontSize={16}
          spinDuration={0.5}
        />
      </WheelContainer>
      <SkipText>
        {language === "Kor" ? " 터치해서 결과 바로보기" : " Tap to Skip"}
      </SkipText>
    </Container>
  );
};

// 메인 컴포넌트: 필터링, 자식 호출
const BarList = ({
  keyword1,
  keyword2,
  keyword3,
  language,
  randomSeed,
  onSpinEnd,
}) => {
  // 필터링 로직
  const filteredData = useMemo(() => {
    return MOCK_DATA.filter((bar) => {
      const matchLocation = keyword1 === "전체" || bar.kor_loc === keyword1;
      const matchFood =
        keyword2 === "전체" ||
        bar.kor_food.includes(keyword2) ||
        (keyword2 === "혼합" && bar.kor_food.length > 1);
      const matchMood = keyword3 === "전체" || bar.kor_mood.includes(keyword3);
      return matchLocation && matchFood && matchMood;
    });
  }, [keyword1, keyword2, keyword3]);

  // 데이터가 없을 때 표시
  useEffect(() => {
    if (filteredData.length === 0 && onSpinEnd) {
      onSpinEnd();
    }
  }, [filteredData, onSpinEnd]);

  if (filteredData.length === 0) {
    return (
      <EmptyMessage>
        {language === "Kor"
          ? "조건에 맞는 주점이 없습니다."
          : "No bars match the selected criteria."}
      </EmptyMessage>
    );
  }

  // 버튼 누를 때마다 randomSeed 변경 -> uniqueKey 생성
  const uniqueKey = `${keyword1}-${keyword2}-${keyword3}-${randomSeed}`;

  return (
    <RouletteGame
      key={uniqueKey}
      data={filteredData}
      language={language}
      randomSeed={randomSeed}
      onSpinEnd={onSpinEnd}
    />
  );
};

export default BarList;

const Container = styled.div`
  font-weight: bold;
  width: 100%;
  max-width: 700px;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  min-height: 400px;
  position: relative;
`;

const WheelContainer = styled.div`
  transform: scale(0.8);
  transition: transform 0.2s;

  border-radius: 50%;
  border: 2px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 500px) {
    transform: scale(0.65);
  }

  &:active {
    transform: scale(0.78);
  }
`;

const SkipText = styled.p`
  color: #888;
  font-size: 0.9rem;
  animation: blink 1.5s infinite;

  @keyframes blink {
    0% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.5;
    }
  }
`;

const RestaurantItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: 1px solid #ddd;
  background-color: #fafafa;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 350px;
  animation: popUp 0.5s ease-out;

  @keyframes popUp {
    0% {
      transform: scale(0.5);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  img {
    height: 300px;
    width: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
  h3 {
    margin-bottom: 5px;
    font-size: 1.4rem;
    font-weight: bold;
    margin-top: 15px;
  }
  p {
    color: #666;
    font-size: 0.9em;
    white-space: pre-wrap;
  }
  span {
    color: #54a4dd;
    font-weight: 500;
  }
`;

const EmptyMessage = styled.div`
  text-align: center;
  color: #888;
  margin-top: 20px;
  padding: 50px;
`;

const MapBtn = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 3px 3px;
  border: none;
  border-radius: 8px;
  margin-top: 7px;
  margin-bottom: 7px;
  background: rgba(142, 247, 151, 1);
  color: white;
  cursor: pointer;
  text-decoration: none;
  font-size: 14px;

  img {
    width: 34px;
    height: 34px;
  }
`;

const Icon = styled.div`
  font-size: 80px;
  margin-bottom: 12px;
`;

const icons = [
  "🍕",
  "🍔",
  "🍿",
  "🌭", 
  "🥓", 
  "🥪", 
  "🌯", 
  "🍗", 
  "🥟", 
  "🍥", 
  "🍢", 
  "🥘", 
  "🍲", 
  "🫕", 
  "🧃", 
  "☕", 
  "🍵", 
  "🍾", 
  "🍷", 
  "🍸",
  "🍹", 
  "🍺", 
  "🍻", 
  "🥂", 
  "🍽️",
];