export const ControlLayout = ({ controlTitle, controlValue }) => {
  return (
    <div className="flex flex-col md:flex-row md:justify-center gap-3 items-center">
      <p className="text-neutral-400">{controlTitle}:</p>
      <p className="text-neutral-0 font-bold">{controlValue}</p>
    </div>
  );
};
