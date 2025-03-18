import dayjs from 'dayjs';

import { useUserStore } from '../../../shared/store/user.store';
import { TimeUtils } from '../../../shared/utils/time.utils';

export const DashboardHeader = () => {
  const user = useUserStore();
  return (
    <div className="flex items-center justify-between w-full gap-2">
      <h1 className="text-foreground text-xl font-medium">
        Good {TimeUtils.getDayTime()}, {user.user?.name}
      </h1>
      <h2 className="text-muted-foreground text-lg font-medium max-lg:hidden mr-8">
        It is {dayjs().format('D MMMM, YYYY')}
      </h2>
    </div>
  );
};
