import styled from "@emotion/styled";
import MOCK_DATA from "../constant/mock";

const BarList = ({ keyword1, keyword2, keyword3 }) => {
  const filteredData = MOCK_DATA.filter((bar) => {
    const matchLocation = keyword1 === "전체" || bar.location === keyword1;
    const matchFood = keyword2 === "전체" || bar.foodType === keyword2;
    const matchMood = keyword3 === "전체" || bar.mood === keyword3;

    return matchLocation && matchFood && matchMood;
  });
  return (
    <Container>
      {filteredData.length > 0 ? (
        filteredData.map((bar) => (
          <RestaurantItem key={bar.id}>
            <Img src={bar.img_url} alt="pokemon" />
            <h3>{bar.name}</h3>
            <p>
              {bar.location} | {bar.foodType} | {bar.mood}
            </p>
          </RestaurantItem>
        ))
      ) : (
        <EmptyMessage>조건에 맞는 술집이 없습니다.</EmptyMessage>
      )}
    </Container>
  );
};

export default BarList;
const Img = styled.img`
  width: 100px;
  height: 100px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 600px;
`;

const RestaurantItem = styled.div`
  border: 1px solid #ddd;
  background-color: #fafafa;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  h3 {
    margin-bottom: 5px;
    font-size: 1.2em;
  }
  p {
    color: #666;
    font-size: 0.9em;
  }
`;

const EmptyMessage = styled.div`
  text-align: center;
  color: #888;
  margin-top: 20px;
`;
