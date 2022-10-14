const KOREA_TIME_DIFFERENCE: number = 9 * 60 * 60 * 1000;

export const convertTimeZone = (currentTime: number): Date => {
  const newTime: number = currentTime + KOREA_TIME_DIFFERENCE;
  const newDate: Date = new Date(newTime);
  return newDate;
}