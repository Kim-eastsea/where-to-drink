import styled from "@emotion/styled";

const Header = ({ language, setLanguage }) => {
  return (
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
  );
};

export default Header;

const ProjectTitle = styled.span`
  font-weight: bold;
  background-color: #ffffff;
  width: 100%;
  max-width: 700px;
  text-align: center;
  font-size: 2rem;
  padding: 10px 40px;
  border-radius: 10px;
  box-shadow: 0 15px 20px rgba(0, 0, 0, 0.14);
  color: #333;
  margin-bottom: 30px;
`;

const LanguageRow = styled.div`
  position: absolute;
  top: 20px;
  right: 25px;
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
