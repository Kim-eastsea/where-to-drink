import styled from "@emotion/styled";
import { Global } from "@emotion/react";
import { GlobalTypographyStyle } from "./styles/typography";
import { GlobalResetStyle } from "./styles/reset";
import Keyword from "./components/Keyword";
import { useState } from "react";
import MainPage from "./components/MainPage";
import Header from "./components/Header";

function App() {
  const [keyword1, setKeyword1] = useState("전체");
  const [keyword2, setKeyword2] = useState("전체");
  const [keyword3, setKeyword3] = useState("전체");
  const [language, setLanguage] = useState("Kor");
  const [randomSeed, setRandomSeed] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleReroll = (k1, k2, k3) => {
    if (isSpinning) return;
    setKeyword1(k1);
    setKeyword2(k2);
    setKeyword3(k3);
    setRandomSeed(Math.random());
    setIsSpinning(true);
  };

  const handleSpinEnd = () => {
    setIsSpinning(false);
  };

  return (
    <>
      <Global styles={GlobalTypographyStyle}></Global>
      <Global styles={GlobalResetStyle}></Global>
      <Container>
        <Header language={language} setLanguage={setLanguage} />
        <Keyword
          language={language}
          onReroll={handleReroll}
          isSpinning={isSpinning}
        />
        <MainPage
          keyword1={keyword1}
          keyword2={keyword2}
          keyword3={keyword3}
          language={language}
          randomSeed={randomSeed}
          onSpinEnd={handleSpinEnd}
        />
      </Container>
    </>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 20px;
`;
