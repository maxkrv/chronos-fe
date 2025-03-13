export const CALENDAR_HOUR_HEIGHT = 96;

export const CALENDAR_DAY_HEIGHT = CALENDAR_HOUR_HEIGHT * 24;
export const CALENDAR_MINUTE_HEIGHT = CALENDAR_HOUR_HEIGHT / 60;

export const Hour = () => {
  return (
    <div className="border border-neutral-200 flex flex-col" style={{ height: CALENDAR_HOUR_HEIGHT }}>
      <div style={{ height: CALENDAR_HOUR_HEIGHT / 2 }} className="border-b border-neutral-200" />
    </div>
  );
};
