import { PageResponse } from "./page-response";
import { Activity } from "../../../interface/activity";

export interface ActivityPageResponse extends PageResponse {
  activities: Activity[];
}
