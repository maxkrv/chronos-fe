export const WeekCalendarHeader = () => {
  return (
    <div className="grid grid-cols-[5rem_1fr] w-full">
      <div className="flex grow p-2 justify-center items-center font-bold text-sm text-neutral-500">GMT+12</div>
      <div className="flex flex-row justify-evenly gap-1 *:grow *:text-center *:py-4 *:rounded-3xl *:w-24">
        <div className="border">Monday</div>
        <div className="border">Tuesday</div>
        <div className="border">Wednesday</div>
        <div className="border">Thursday</div>
        <div className="border">Friday</div>
        <div className="border">Saturday</div>
        <div className="border">Sunday</div>
      </div>
    </div>
  );
};
