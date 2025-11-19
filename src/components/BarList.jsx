import styled from "@emotion/styled";
import MOCK_DATA from "../constant/mock";
import { useMemo } from "react";

const BarList = ({ keyword1, keyword2, keyword3, language, randomSeed }) => {
  const randomPick = useMemo(() => {
    const filteredData = MOCK_DATA.filter((bar) => {
      const matchLocation = keyword1 === "전체" || bar.kor_loc === keyword1;
      const matchFood = keyword2 === "전체" || bar.kor_food.includes(keyword2);
      const matchMood = keyword3 === "전체" || bar.kor_mood.includes(keyword3);
      return matchLocation && matchFood && matchMood;
    });

    if (filteredData.length === 0) {
      return null;
    }
    const randomIndex = Math.floor(randomSeed * filteredData.length);
    return filteredData[randomIndex];
  }, [keyword1, keyword2, keyword3, randomSeed]);
  if (!randomPick) {
    return (
      <EmptyMessage>
        {language === "Kor"
          ? "조건에 맞는 음식점이 없습니다."
          : "No restaurants match the criteria."}
      </EmptyMessage>
    );
  }
  return (
    <Container>
      <RestaurantItem key={randomPick.id}>
        <img src={randomPick.img_url} />
        <h3>{randomPick.name}</h3>
        {language === "Kor" ? (
          <p>
            {randomPick.kor_loc} | {randomPick.kor_mood.join(", ")}
            <br />
            {randomPick.kor_food.join(", ")}
            <br />
            <span>{randomPick.kor_hashtag.join(" ")}</span>
          </p>
        ) : (
          <p>
            {randomPick.eng_loc} | {randomPick.eng_mood.join(", ")}
            <br />
            {randomPick.eng_food.join(", ")}
            <br />
            <span>{randomPick.eng_hashtag.join(" ")}</span>
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
    width: 200px;
    height: 200px;
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
