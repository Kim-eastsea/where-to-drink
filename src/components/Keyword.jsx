import styled from "@emotion/styled";
import { useState } from "react";
const Keyword = ({
  keyword1,
  keyword2,
  keyword3,
  language,
  onReroll,
  isSpinning,
}) => {
  const [tempKey1, setTempKey1] = useState(keyword1 || "전체");
  const [tempKey2, setTempKey2] = useState(keyword2 || "전체");
  const [tempKey3, setTempKey3] = useState(keyword3 || "전체");

  const handleReroll = () => {
    if (!isSpinning) {
      onReroll(tempKey1, tempKey2, tempKey3);
    }
  };

  return (
    <Container>
      <KeywordBox>
        <Label>{language === "Kor" ? "위치" : "Location"}</Label>
        <Options>
          <OptionBtn
            isActive={tempKey1 === "전체"}
            onClick={() => setTempKey1("전체")}
          >
            {language === "Kor" ? "전체" : "All"}
          </OptionBtn>
          <OptionBtn
            isActive={tempKey1 === "북문"}
            onClick={() => setTempKey1("북문")}
          >
            {language === "Kor" ? "북문" : "North Gate"}
          </OptionBtn>
          <OptionBtn
            isActive={tempKey1 === "정문"}
            onClick={() => setTempKey1("정문")}
          >
            {language === "Kor" ? "정문" : "Main Gate"}
          </OptionBtn>
          <OptionBtn
            isActive={tempKey1 === "쪽문"}
            onClick={() => setTempKey1("쪽문")}
          >
            {language === "Kor" ? "쪽문" : "Side Gate"}
          </OptionBtn>
        </Options>
      </KeywordBox>

      <KeywordBox>
        <Label>{language === "Kor" ? "음식" : "Food"}</Label>
        <Options>
          <OptionBtn
            isActive={tempKey2 === "전체"}
            onClick={() => setTempKey2("전체")}
          >
            {language === "Kor" ? "전체" : "All"}
          </OptionBtn>
          <OptionBtn
            isActive={tempKey2 === "한식"}
            onClick={() => setTempKey2("한식")}
          >
            {language === "Kor" ? "한식" : "Korean"}
          </OptionBtn>
          <OptionBtn
            isActive={tempKey2 === "양식"}
            onClick={() => setTempKey2("양식")}
          >
            {language === "Kor" ? "양식" : "Western"}
          </OptionBtn>
          <OptionBtn
            isActive={tempKey2 === "일식"}
            onClick={() => setTempKey2("일식")}
          >
            {language === "Kor" ? "일식" : "Japanese"}
          </OptionBtn>
          <OptionBtn
            isActive={tempKey2 === "중식"}
            onClick={() => setTempKey2("중식")}
          >
            {language === "Kor" ? "중식" : "Chinese"}
          </OptionBtn>
          <OptionBtn
            isActive={tempKey2 === "혼합"}
            onClick={() => setTempKey2("혼합")}
          >
            {language === "Kor" ? "혼합" : "Fusion"}
          </OptionBtn>
        </Options>
      </KeywordBox>
      <KeywordBox>
        <Label>{language === "Kor" ? "분위기" : "Mood"}</Label>
        <Options>
          <OptionBtn
            isActive={tempKey3 === "전체"}
            onClick={() => setTempKey3("전체")}
          >
            {language === "Kor" ? "전체" : "All"}
          </OptionBtn>
          <OptionBtn
            isActive={tempKey3 === "회식"}
            onClick={() => setTempKey3("회식")}
          >
            {language === "Kor" ? "회식" : "Groups"}
          </OptionBtn>
          <OptionBtn
            isActive={tempKey3 === "지인"}
            onClick={() => setTempKey3("지인")}
          >
            {language === "Kor" ? "지인" : "With Friends"}
          </OptionBtn>
          <OptionBtn
            isActive={tempKey3 === "커플"}
            onClick={() => setTempKey3("커플")}
          >
            {language === "Kor" ? "커플" : "Couple"}
          </OptionBtn>
          <OptionBtn
            isActive={tempKey3 === "과팅"}
            onClick={() => setTempKey3("과팅")}
          >
            {language === "Kor" ? "과팅" : "Group Dating"}
          </OptionBtn>
        </Options>
      </KeywordBox>

      <RerollBtn onClick={handleReroll} disabled={isSpinning}>
        {isSpinning
          ? language === "Kor"
            ? "돌리는 중..."
            : "Spinning..."
          : language === "Kor"
          ? "🎲 돌려돌려 돌림판"
          : "🎲 Spin the Wheel"}
      </RerollBtn>
    </Container>
  );
};

export default Keyword;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 700px;
  background: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
`;

const KeywordBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Label = styled.span`
  font-weight: bold;
  min-width: 70px;
  color: #333;
`;

const Options = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  align-items: center;
`;

const OptionBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  padding: 4px 8px;
  border-radius: 5px;
  transition: all 0.2s;

  color: ${(props) => (props.isActive ? "#f55e6b" : "#888")};
  font-weight: ${(props) => (props.isActive ? "bold" : "normal")};
  background-color: ${(props) => (props.isActive ? "#FFF0F1" : "transparent")};

  &:hover {
    color: ${(props) => (props.isActive ? "#f55e6b" : "#333")};
    background-color: ${(props) => (props.isActive ? "#f9d9db" : "#f0f0f0")};
  }
`;

const RerollBtn = styled.button`
  margin-top: 10px;
  justify-content: center;
  display: flex;
  padding: 12px;
  background-color: #333;
  color: white;
  font-size: 1.1rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: #555;
    transform: translateY(-2px);
  }
  &:active {
    transform: translateY(0);
  }
  &:disabled {
    background-color: #999;
    cursor: not-allowed;
    transform: none;
  }
`;
