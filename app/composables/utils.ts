import { CronJob } from "cron";

export const isBrowser = () => typeof window !== "undefined";
export function lastCronDate(exp: string) {
  return new CronJob(exp, () => {}).lastDate();
}
export function nextCronDate(exp: string, count?: number) {
  return new CronJob(exp, () => {}).nextDates(count);
}
