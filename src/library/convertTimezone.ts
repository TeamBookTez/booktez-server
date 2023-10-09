const KOREA_TIME_DIFFERENCE: number = 9 * 60 * 60 * 1000;

export const convertTimeZone = (currentTime: number): Date => {
  let newTime: number = currentTime + KOREA_TIME_DIFFERENCE;
  let newDate: Date = new Date(newTime);
  return newDate;
}