import { Accuracy } from "./Accuracy";
import { Wpm } from "./Wpm";
import { Time } from "./Time";

export const Controls = ({ mode }) => {
  return (
    <div className="grid grid-cols-3 divide-x-2 divide-neutral-700">
      <Wpm />
      <Accuracy />
      <Time mode={mode} />
    </div>
  );
};
