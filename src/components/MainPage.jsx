import styled from "@emotion/styled";
import BarList from "./BarList";
const MainPage = ({ keyword1, keyword2, keyword3, language, randomSeed }) => {
  return (
    <>
      <BarList
        keyword1={keyword1}
        keyword2={keyword2}
        keyword3={keyword3}
        language={language}
        randomSeed={randomSeed}
      />
    </>
  );
};
export default MainPage;

const EmptyMessage = styled.div`
  text-align: center;
  color: #888;
  margin-top: 20px;
`;
