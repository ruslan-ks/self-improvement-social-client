import { ActivityType } from "../enum/activity-type";

export interface Activity {
  id: number;
  type: ActivityType;
  name: string;
  description: string;
  minutesRequired: number;
  authorId: number;
  categoryIds: number[];
  userCount: number;

  // LIMITED_COMPLETIONS activity properties
  completionsLimit: number;

  // PERIODICAL_LIMITED_COMPLETIONS activity properties
  periodDurationMinutes: number;
}
