import styled from "@emotion/styled";
import MOCK_DATA from "../constant/mock";

const BarList = ({ keyword1, keyword2, keyword3, language, setError }) => {
  const filteredData = MOCK_DATA.filter((bar) => {
    const matchLocation = keyword1 === "전체" || bar.location === keyword1;
    const matchFood = keyword2 === "전체" || bar.foodType === keyword2;
    const matchMood = keyword3 === "전체" || bar.mood === keyword3;
    return matchLocation && matchFood && matchMood;
  });
  return (
    <Container>
      {filteredData.length > 0
        ? (setError(false),
          filteredData.map((bar) => (
            <RestaurantItem key={bar.id}>
              <img src={bar.img_url} alt="pokemon" />
              <h3>{bar.name}</h3>
              <p>
                {bar.location} | {bar.foodType} | {bar.mood} | {bar.hashtag}
              </p>
            </RestaurantItem>
          )))
        : setError(true)}
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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
`;
const RestaurantItem = styled.div`
  border: 1px solid #ddd;
  background-color: #fafafa;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  img {
    width: 120px;
    height: 120px;
  }
  h3 {
    margin-bottom: 5px;
    font-size: 1.2em;
  }
  p {
    color: #666;
    font-size: 0.9em;
  }
`;
