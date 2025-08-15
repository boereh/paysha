import { CronJob } from "cron";

export function lastCronDate(exp: string) {
  return new CronJob(exp, () => {}).lastDate();
}

export function nextCronDate(exp: string, count?: number) {
  return new CronJob(exp, () => {}).nextDates(count);
}
