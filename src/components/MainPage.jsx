import styled from "@emotion/styled";
import BarList from "./BarList";
const MainPage = ({
  keyword1,
  keyword2,
  keyword3,
  language,
  error,
  setError,
  trigger,
}) => {
  return (
    <>
      <BarList
        keyword1={keyword1}
        keyword2={keyword2}
        keyword3={keyword3}
        language={language}
        error={error}
        setError={setError}
        trigger={trigger}
      />
      {error === true ? (
        <EmptyMessage>
          {language === "Kor"
            ? "조건에 맞는 술집이 없습니다."
            : "No bars found matching the criteria."}
        </EmptyMessage>
      ) : (
        ""
      )}
    </>
  );
};
export default MainPage;

const EmptyMessage = styled.div`
  text-align: center;
  color: #888;
  margin-top: 20px;
`;
