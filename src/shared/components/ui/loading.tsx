export const Loading = () => {
  const qubeStyle = 'animate-morph block h-full  w-full origin-bottom rounded-[25%] bg-text-primary';
  return (
    <div className="flex w-full grow items-center min-h-20 justify-center self-stretch">
      <div className="flex w-fit items-end justify-between gap-2 pt-4 *:size-2 *:shrink-0 *:animate-jump">
        <div>
          <div className={qubeStyle}></div>
        </div>
        <div style={{ animationDelay: '-0.63s' }}>
          <div className={qubeStyle} style={{ animationDelay: '-0.63s' }}></div>
        </div>
        <div style={{ animationDelay: '-0.35s' }}>
          <div className={qubeStyle} style={{ animationDelay: '-0.35s' }}></div>
        </div>
      </div>
    </div>
  );
};
