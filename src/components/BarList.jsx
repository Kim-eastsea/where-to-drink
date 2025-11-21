import styled from "@emotion/styled";
import MOCK_DATA from "../constant/mock";
import { useMemo, useState, useEffect } from "react";
import confetti from "canvas-confetti";

const BarList = ({
  keyword1,
  keyword2,
  keyword3,
  language,
  randomSeed,
  onSpinEnd,
}) => {
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

  const [displayedBar, setDisplayedBar] = useState(null);

  useEffect(() => {
    if (randomSeed === 0) return;

    if (filteredData.length === 0) {
      setDisplayedBar(null);
      onSpinEnd && onSpinEnd();
      return;
    }

    let currentCount = 0;
    const maxShuffles = 20;
    let currentDelay = 50;
    let timeoutId = null;

    const shuffle = () => {
      const tempIndex = Math.floor(Math.random() * MOCK_DATA.length);
      setDisplayedBar(MOCK_DATA[tempIndex]);
      currentCount++;

      if (currentCount < maxShuffles) {
        currentDelay += currentCount * 2;
        timeoutId = setTimeout(shuffle, currentDelay);
      } else {
        const finalIndex = Math.floor(randomSeed * filteredData.length);
        setDisplayedBar(filteredData[finalIndex]);

        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#f55e6b", "#54a4dd", "#f5a623", "#ffffff", "#ffd700"],
        });
        if (onSpinEnd) {
          onSpinEnd();
        }
      }
    };

    shuffle();

    return () => {
      clearInterval(timeoutId);
      confetti.reset();
    };
  }, [randomSeed, filteredData]);

  if (!displayedBar && filteredData.length === 0) {
    return (
      <EmptyMessage>
        {language === "Kor"
          ? "조건에 맞는 주점이 없습니다."
          : "No bars match the selected criteria."}
      </EmptyMessage>
    );
  }
  if (!displayedBar) {
    return null;
  }

  return (
    <Container>
      <RestaurantItem key={displayedBar.id}>
        <img src={displayedBar.img_url} />
        <h3>{displayedBar.name}</h3>
        {language === "Kor" ? (
          <p>
            {displayedBar.kor_loc} | {displayedBar.kor_mood.join(", ")}
            <br />
            {displayedBar.kor_food.join(", ")}
            <br /> 
            {
              // 링크 추가 (클릭하면 바로 사이트로 이동)
            }
            <MapBtn href={displayedBar.web_link} target="_blank" rel="noopener noreferrer">
              <img src="src\constant\img\navermap.png" alt="네이버지도" />
            </MapBtn>
            <br />
            <span>{displayedBar.kor_hashtag.join(" ")}</span>
          </p>
        ) : (
          <p>
            {displayedBar.eng_loc} | {displayedBar.eng_mood.join(", ")}
            <br />
            {displayedBar.eng_food.join(", ")}
            <br />
            <MapBtn href={displayedBar.web_link} target="_blank" rel="noopener noreferrer">
              <img src="src\constant\img\navermap.png" alt="네이버지도" />
            </MapBtn>
            <br />
            <span>{displayedBar.eng_hashtag.join(" ")}</span>
          </p>
        )}
      </RestaurantItem>
    </Container>
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
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
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
  img {
    width: 300px;
    height: 300px;
  }
  h3 {
    margin-bottom: 5px;
    font-size: 1.2em;
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
