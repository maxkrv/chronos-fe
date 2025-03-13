export const SideTime = () => {
  return (
    <div className="flex flex-col h-fit">
      {Array.from({ length: 24 }).map((_, i) => (
        <div key={i} className="max-h-24 min-h-24 text-end text-neutral-400 pr-3">
          {i + ':00'}
        </div>
      ))}
    </div>
  );
};
