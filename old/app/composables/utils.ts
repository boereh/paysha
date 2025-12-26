import { CronExpressionParser } from "cron-parser";

export const isBrowser = () => typeof window !== "undefined";
export function takeCronDate(exp: string, count?: number) {
  return CronExpressionParser.parse(exp).take(count || 1);
}
