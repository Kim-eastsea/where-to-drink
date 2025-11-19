import "./App.css";
import styled from "@emotion/styled";
import { Global } from "@emotion/react";
import { GlobalTypographyStyle } from "./styles/typography";
import { GlobalResetStyle } from "./styles/reset";
import Keyword from "./components/Keyword";
import { useState } from "react";
import MainPage from "./components/MainPage";

function App() {
  const [keyword1, setKeyword1] = useState("전체");
  const [keyword2, setKeyword2] = useState("전체");
  const [keyword3, setKeyword3] = useState("전체");
  const [language, setLanguage] = useState("Kor");
  const [error, setError] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const handleReroll = (k1, k2, k3) => {
    setKeyword1(k1);
    setKeyword2(k2);
    setKeyword3(k3);
    setTrigger((prev) => prev + 1);
  };

  return (
    <>
      <Global styles={GlobalTypographyStyle}></Global>
      <Global styles={GlobalResetStyle}></Global>
      <Container>
        <ProjectTitle>
          {language === "Kor" ? "어디서 마실래?" : "Where to Drink?"}
          <LanguageRow>
            <LanguageBtn
              isActive={language === "Kor"}
              onClick={() => setLanguage("Kor")}
            >
              Kor
            </LanguageBtn>
            <LanguageBtn
              isActive={language === "Eng"}
              onClick={() => setLanguage("Eng")}
            >
              Eng
            </LanguageBtn>
          </LanguageRow>
        </ProjectTitle>
        <Keyword
          keyword1={keyword1}
          keyword2={keyword2}
          keyword3={keyword3}
          language={language}
          onReroll={handleReroll}
        />
        <MainPage
          keyword1={keyword1}
          keyword2={keyword2}
          keyword3={keyword3}
          language={language}
          error={error}
          setError={setError}
          trigger={trigger}
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

const ProjectTitle = styled.span`
  font-weight: bold;
  background-color: #ffffff;
  width: 100%;
  text-align: center;
  font-size: 2rem;
  padding: 10px 40px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  color: #333;
  margin-bottom: 40px;
`;

const LanguageRow = styled.div`
  position: absolute;
  top: 30px;
  right: 35px;
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
  width: 80px;
`;
const LanguageBtn = styled.button`
  width: 50%;
  max-width: 40px;
  padding: 5px 0;
  font-size: 18px;
  font-weight: 300;
  cursor: pointer;

  color: ${(props) => (props.isActive ? "#3f3f3f" : "#888")};
  font-weight: ${(props) => (props.isActive ? "bold" : "normal")};
  background-color: ${(props) => (props.isActive ? "#c6c6c6" : "transparent")};

  &:hover {
    color: ${(props) => (props.isActive ? "#3f3f3f" : "#333")};
    background-color: ${(props) => (props.isActive ? "#c6c6c6" : "#f0f0f0")};
  }
`;
