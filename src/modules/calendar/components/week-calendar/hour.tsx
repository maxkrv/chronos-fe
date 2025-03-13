export const CALENDAR_HOUR_HEIGHT = 96;
export const CALENDAR_DAY_HEIGHT = CALENDAR_HOUR_HEIGHT * 24;

export const Hour = () => {
  return <div className="border border-neutral-200" style={{ height: CALENDAR_HOUR_HEIGHT }}></div>;
};
