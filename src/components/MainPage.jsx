import BarList from "./BarList";
const MainPage = ({
  keyword1,
  keyword2,
  keyword3,
  language,
  randomSeed,
  onSpinEnd,
}) => {
  return (
    <>
      <BarList
        keyword1={keyword1}
        keyword2={keyword2}
        keyword3={keyword3}
        language={language}
        randomSeed={randomSeed}
        onSpinEnd={onSpinEnd}
      />
    </>
  );
};
export default MainPage;
