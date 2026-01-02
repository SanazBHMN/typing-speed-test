export const Passage = ({ passage, onPassageClick }) => {
  return <p onClick={onPassageClick}>{passage?.text}</p>;
};
