export enum DayTime {
  MORNING = 'Morning',
  AFTERNOON = 'Afternoon',
  EVENING = 'Evening',
  NIGHT = 'Night'
}
export class TimeUtils {
  static ONE_MILLISECOND = 1;
  static ONE_SECOND = TimeUtils.ONE_MILLISECOND * 1000;
  static ONE_MINUTE = TimeUtils.ONE_SECOND * 60;
  static ONE_HOUR = TimeUtils.ONE_MINUTE * 60;
  static ONE_DAY = TimeUtils.ONE_HOUR * 24;
  static ONE_WEEK = TimeUtils.ONE_DAY * 7;
  static ONE_MONTH = TimeUtils.ONE_DAY * 30;
  static ONE_YEAR = TimeUtils.ONE_DAY * 365;

  static getDayTime(): DayTime {
    const hours = new Date().getHours();

    if (hours > 22 || hours < 5) {
      return DayTime.NIGHT;
    }
    if (hours >= 5 && hours < 12) {
      return DayTime.MORNING;
    }
    if (hours >= 12 && hours < 17) {
      return DayTime.AFTERNOON;
    }
    return DayTime.EVENING;
  }
  static timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
