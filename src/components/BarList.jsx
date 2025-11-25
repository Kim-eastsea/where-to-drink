import styled from "@emotion/styled";
import MOCK_DATA from "../constant/mock";
import { useMemo, useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { Wheel } from "react-custom-roulette";

// 룰렛 게임 컴포넌트
const RouletteGame = ({ data, language, randomSeed, onSpinEnd }) => {
  const rouletteData = useMemo(() => {
    const colors = ["#f55e6b", "#54a4dd", "#f5a623", "#8ef797", "#b78eff"];
    return data.map((bar, index) => ({
      option: bar.name.length > 7 ? bar.name.substring(0, 6) + ".." : bar.name,
      style: {
        backgroundColor: colors[index % colors.length],
        textColor: "white",
      },
    }));
  }, [data]);

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [finalBar, setFinalBar] = useState(null);

  const audioRef = useRef(new Audio("/sound/roulette.mp3"));

  useEffect(() => {
    if (randomSeed === 0 || data.length === 0) return;

    const timer = setTimeout(() => {
      const newPrizeNumber = Math.floor(randomSeed * data.length);
      setPrizeNumber(newPrizeNumber);

      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((e) => console.log("Sound play error:", e));

      setMustSpin(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  const handleStopSpinning = () => {
    setMustSpin(false);

    audioRef.current.pause();
    audioRef.current.currentTime = 0;

    if (data[prizeNumber]) {
      setFinalBar(data[prizeNumber]);
      setShowResult(true);

      // 파티클 효과
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#f55e6b", "#54a4dd", "#f5a623", "#ffffff", "#ffd700"],
      });
    }

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
    <Container>
      <WheelContainer>
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={rouletteData}
          onStopSpinning={handleStopSpinning}
          backgroundColors={["#3e3e3e", "#df3428"]}
          textColors={["#ffffff"]}
          outerBorderColor="#333"
          outerBorderWidth={5}
          innerRadius={20}
          innerBorderColor="#333"
          innerBorderWidth={0}
          radiusLineColor="#dedede"
          radiusLineWidth={1}
          fontSize={16}
          spinDuration={0.6}
        />
      </WheelContainer>
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
  width: 100%;
  max-width: 700px;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 10px;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  min-height: 400px;
`;

const WheelContainer = styled.div`
  transform: scale(0.8);
  @media (max-width: 500px) {
    transform: scale(0.65);
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
