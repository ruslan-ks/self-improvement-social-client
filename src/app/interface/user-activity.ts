import { Activity } from "./activity";

export interface UserActivity {
  activity: Activity;
  startedAt: number;        // unix epoch time
  completions: number[];    // unix epoch time
}
