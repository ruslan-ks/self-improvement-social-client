import { Component, Input, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { UserActivity } from "../../interface/user-activity";
import { Chart, ChartConfiguration, registerables } from "chart.js";
import { CategoryService } from "../../service/category.service";
import { FunctionUtil } from "../../util/function-util";

@Component({
  selector: 'app-user-activity-statistics',
  templateUrl: './user-activity-statistics.component.html',
  styleUrls: ['./user-activity-statistics.component.css']
})
export class UserActivityStatisticsComponent implements OnInit {

  @Input({required: true}) userActivities!: Observable<UserActivity[]>;

  categoriesCompletionsChart!: Chart;

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.userActivities.subscribe(userActivities => {
      userActivities.forEach(a => {
        let startedAt = new Date(a.startedAt * 1000);
        console.log(startedAt);
      });

      this.initActivitiesCompletionsChart(userActivities);

      const categoryIdCompletionsCountMap = new Map<number, number>();
      userActivities.map(userActivity => userActivity.activity.categoryIds)
        .reduce((allIds, currentIds) => [...allIds, ...currentIds])
        .filter(FunctionUtil.unique)
        .forEach(id => categoryIdCompletionsCountMap.set(id, 0));

      userActivities.forEach(ua => {
        ua.activity.categoryIds.forEach(id => {
          categoryIdCompletionsCountMap.set(id, categoryIdCompletionsCountMap.get(id)! + ua.completions.length)
        });
      });

      this.categoryService.getCategoriesById$(Array.from(categoryIdCompletionsCountMap.keys()))
        .subscribe(categories => {
          const categoryNameCompletionsMap = new Map(Array.from(categoryIdCompletionsCountMap,
            ([k, v]) => [categories.find(c => c.id === k)!.name, v]));
          console.log('Category completions map: ', categoryNameCompletionsMap);
          this.initCategoriesCompletionsChart(categoryNameCompletionsMap);
        })
    });
  }

  initCategoriesCompletionsChart(categoryCompletionCountMap: Map<string, number>) {
    Chart.register(...registerables);
    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: Array.from(categoryCompletionCountMap.keys()),
        datasets: [{
          data: Array.from(categoryCompletionCountMap.values()),
          backgroundColor: Array(categoryCompletionCountMap.size).fill('rgba(54, 162, 235, 0.2)'),
          borderColor: Array(categoryCompletionCountMap.size).fill('rgba(54, 162, 235, 1)'),
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
              font: {
                size: 18
              }
            }
          },
          x: {
            ticks: {
              font: {
                size: 18
              }
            }
          }
        }
      }
    };
    this.categoriesCompletionsChart = new Chart("categories-completions-count-chart", config);
  }

  initActivitiesCompletionsChart(userActivities: UserActivity[]) {
    Chart.register(...registerables);
    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: userActivities.map(ua => ua.activity.name),
        datasets: [{
          data: userActivities.map(ua => ua.completions.length),
          backgroundColor: Array(userActivities.length).fill('rgba(87,235,54,0.2)'),
          borderColor: Array(userActivities.length).fill('rgb(66,235,54)'),
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
              font: {
                size: 18
              }
            }
          },
          x: {
            ticks: {
              font: {
                size: 18
              }
            }
          }
        }
      }
    };
    this.categoriesCompletionsChart = new Chart("activities-completions-count-chart", config);
  }
}
