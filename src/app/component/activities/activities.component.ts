import { Component, Input } from '@angular/core';
import { Activity } from "../../interface/activity";

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent {
  @Input({ required: true }) activities: Activity[];
}
