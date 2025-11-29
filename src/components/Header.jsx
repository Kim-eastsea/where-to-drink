import styled from "@emotion/styled";

const Header = ({ language, setLanguage }) => {
  return (
    <HeaderWrapper>
      <div />
      <ProjectTitle>
        {language === "Kor" ? "어디서 마실래?" : "Where to Drink?"}
      </ProjectTitle>
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
    </HeaderWrapper>
  );
};

export default Header;

const ProjectTitle = styled.span`
  font-weight: bold;
  width: 100%;
  text-align: center;
  font-size: 2rem;
  padding: 10px 10px;
  color: #333;
`;

const LanguageRow = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #c6c6c6;
  border-radius: 5px;
  overflow: hidden;
  width: 90px;
  background-color: #f9f9f9;

  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.13);
`;
const LanguageBtn = styled.button`
  text-align: center;
  width: 50%;
  max-width: 45px;
  padding: 5px 0;
  font-size: 20px;
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

const HeaderWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  width: 100%;
  justify-items: right;

  font-weight: bold;
  background-color: #ffffff;
  width: 100%;
  max-width: 700px;
  align-items: center;
  font-size: 2rem;
  padding: 5px 20px;
  box-sizing: border-box;
  border-radius: 10px;
  box-shadow: 0 15px 20px rgba(0, 0, 0, 0.14);
  color: #333;
  margin-bottom: 30px;
`;
