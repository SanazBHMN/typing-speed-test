import { getRandomIndex } from "../utils/getRandomIndex";

export const Passage = ({ passages, difficultyLevel }) => {
  return (
    <p>
      {difficultyLevel === "easy"
        ? passages["easy"][getRandomIndex()].text
        : difficultyLevel === "medium"
        ? passages["medium"][getRandomIndex()].text
        : passages["hard"][getRandomIndex()].text}
    </p>
  );
};
