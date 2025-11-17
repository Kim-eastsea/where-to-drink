import styled from "@emotion/styled";
import { useState } from "react";
const Keyword = ({
  keyword1,
  setKeyword1,
  keyword2,
  setKeyword2,
  keyword3,
  setKeyword3,
}) => {
  const [tempKey1, setTempKey1] = useState(keyword1 || "전체");
  const [tempKey2, setTempKey2] = useState(keyword2 || "전체");
  const [tempKey3, setTempKey3] = useState(keyword3 || "전체");

  const handleReroll = () => {
    setKeyword1(tempKey1);
    setKeyword2(tempKey2);
    setKeyword3(tempKey3);
    console.log("Rerolled with:", tempKey1, tempKey2, tempKey3);
  };

  return (
    <Container>
      <KeywordBox>
        <Label>위치</Label>
        <Options>
          <OptionBtn
            isActive={tempKey1 === "전체"}
            onClick={() => setTempKey1("전체")}
          >
            전체
          </OptionBtn>
          <OptionBtn
            isActive={tempKey1 === "북문"}
            onClick={() => setTempKey1("북문")}
          >
            북문
          </OptionBtn>
          <OptionBtn
            isActive={tempKey1 === "정문"}
            onClick={() => setTempKey1("정문")}
          >
            정문
          </OptionBtn>
          <OptionBtn
            isActive={tempKey1 === "쪽문"}
            onClick={() => setTempKey1("쪽문")}
          >
            쪽문
          </OptionBtn>
        </Options>
      </KeywordBox>

      <KeywordBox>
        <Label>음식</Label>
        <Options>
          <OptionBtn
            isActive={tempKey2 === "전체"}
            onClick={() => setTempKey2("전체")}
          >
            전체
          </OptionBtn>
          <OptionBtn
            isActive={tempKey2 === "한식"}
            onClick={() => setTempKey2("한식")}
          >
            한식
          </OptionBtn>
          <OptionBtn
            isActive={tempKey2 === "양식"}
            onClick={() => setTempKey2("양식")}
          >
            양식
          </OptionBtn>
          <OptionBtn
            isActive={tempKey2 === "일식"}
            onClick={() => setTempKey2("일식")}
          >
            일식
          </OptionBtn>
          <OptionBtn
            isActive={tempKey2 === "중식"}
            onClick={() => setTempKey2("중식")}
          >
            중식
          </OptionBtn>
          <OptionBtn
            isActive={tempKey2 === "혼합"}
            onClick={() => setTempKey2("혼합")}
          >
            혼합
          </OptionBtn>
        </Options>
      </KeywordBox>
      <KeywordBox>
        <Label>분위기</Label>
        <Options>
          <OptionBtn
            isActive={tempKey3 === "전체"}
            onClick={() => setTempKey3("전체")}
          >
            전체
          </OptionBtn>
          <OptionBtn
            isActive={tempKey3 === "회식"}
            onClick={() => setTempKey3("회식")}
          >
            회식
          </OptionBtn>
          <OptionBtn
            isActive={tempKey3 === "지인"}
            onClick={() => setTempKey3("지인")}
          >
            지인
          </OptionBtn>
          <OptionBtn
            isActive={tempKey3 === "커플"}
            onClick={() => setTempKey3("커플")}
          >
            커플
          </OptionBtn>
          <OptionBtn
            isActive={tempKey3 === "과팅"}
            onClick={() => setTempKey3("과팅")}
          >
            과팅
          </OptionBtn>
        </Options>
      </KeywordBox>

      <RerollBtn onClick={handleReroll}>🎲 돌려돌려 돌림판</RerollBtn>
    </Container>
  );
};

export default Keyword;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 600px;
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
  min-width: 60px;
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
`;
