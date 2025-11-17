import "./App.css";
import styled from "@emotion/styled";
import { Global } from "@emotion/react";
import { GlobalTypographyStyle } from "./styles/typography";
import { GlobalResetStyle } from "./styles/reset";
import Keyword from "./components/Keyword";
import BarList from "./components/BarList";
import { useState } from "react";

function App() {
  const [keyword1, setKeyword1] = useState("전체");
  const [keyword2, setKeyword2] = useState("전체");
  const [keyword3, setKeyword3] = useState("전체");

  return (
    <>
      <Global styles={GlobalTypographyStyle}></Global>
      <Global styles={GlobalResetStyle}></Global>
      <Container>
        <ProjectTitle>어디서 마실래?</ProjectTitle>
        <Keyword
          keyword1={keyword1}
          keyword2={keyword2}
          keyword3={keyword3}
          setKeyword1={setKeyword1}
          setKeyword2={setKeyword2}
          setKeyword3={setKeyword3}
        />
        <BarList
          keyword1={keyword1}
          keyword2={keyword2}
          keyword3={keyword3}
          setKeyword1={setKeyword1}
          setKeyword2={setKeyword2}
          setKeyword3={setKeyword3}
        />
      </Container>
    </>
  );
}

export default App;

const ProjectTitle = styled.span`
  font-weight: bold;
  background-color: #ffffff;
  font-size: 2rem;
  padding: 10px 40px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  color: #333;
  margin-bottom: 40px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 20px;
`;
