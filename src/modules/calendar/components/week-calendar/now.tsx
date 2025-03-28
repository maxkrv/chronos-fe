import { useState } from 'react';
import { useInterval } from 'usehooks-ts';

import dayjs from '../../../../shared/lib/dayjs';
import { TimeUtils } from '../../../../shared/utils/time.utils';

export const MINUTES_IN_DAY = 1440;

export const NowMarker = () => {
  const [now, setNow] = useState(dayjs());
  const minutesFromStartOfDay = now.diff(dayjs().startOf('day'), 'minute');

  useInterval(() => setNow(dayjs()), TimeUtils.ONE_SECOND);

  return (
    <div
      className="absolute flex gap-2 font-bold w-full transform -translate-y-1/2 z-[6000]"
      style={{
        top: `${(minutesFromStartOfDay / MINUTES_IN_DAY) * 100}%`
      }}>
      <hr className="relative m-auto border border-current text-primary w-full overflow-visible before:content-[''] before:left-0 before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:absolute before:rounded-full before:border-current before:border-8" />
    </div>
  );
};
