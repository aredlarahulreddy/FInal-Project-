import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Chart, ChartConfiguration, ChartType } from 'chart.js/auto';
import { AuthService } from '../authentication/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import action from "../helper/action";

@Component({
  selector: 'app-summary',
  templateUrl: './Analytics.component.html',
  styleUrls: ['./Analytics.component.css']

})
export class AnalyticsComponent implements AfterViewInit {

  constructor(private http: HttpClient, public auth: AuthService, private cdref: ChangeDetectorRef) { }
  username: string | null = '';
  title = 'project';
  logout() {
    this.auth.logout();
  }


  ngAfterViewInit(): void {
    console.log("after")
    this.username = action.getLoggedInUserName();
    this.cdref.detectChanges();
    const token = action.getAuthToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
  this.http.get<any>(action.apiUrl + 'chart/lineChart', { headers })
  .subscribe({
    next: (chartDataArray: any) => {
      // Assume chartDataArray is an array with one chart config object
      const chartData = chartDataArray[0];

      const ctx = document.getElementById('summaryChart') as HTMLCanvasElement;
      if (!ctx) return;

      new Chart(ctx, {
        type: 'line',
        data: {
          labels: chartData.labels,
          datasets: chartData.datasets.map((ds: any) => ({
            ...ds,
            fill: false,
            tension: ds.tension ?? 0.3,
            pointStyle: ds.pointStyle || 'circle',
            pointBackgroundColor: ds.pointBackgroundColor || ds.borderColor
          }))
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Energy Trends Overview'
            },
            legend: {
              display: true,
              position: 'top'
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Month'
              }
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Values'
              }
            }
          }
        }
      });
    },
    error: (err: any) => {
      console.error('Error loading line chart data:', err);
    }
  });
  }
    
}