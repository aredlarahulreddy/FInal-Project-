import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import Chart from 'chart.js/auto';
import { AuthService } from '../authentication/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import action from "../helper/action";

@Component({
  selector: 'app-reports',
  templateUrl: './Insights.component.html',
  styleUrls: ['./Insights.component.css']

})
export class InsightComponent implements AfterViewInit {
  constructor(public auth: AuthService, private http: HttpClient, private cdref: ChangeDetectorRef) { }
  username: string | null = '';
  title = 'project';


  logout() {
    this.auth.logout();
  }


  ngAfterViewInit(): void {
    this.username = action.getLoggedInUserName();
    this.cdref.detectChanges(); // manually trigger change detection
    const token = action.getAuthToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any[]>(action.apiUrl + 'chart/pieChart', { headers }).subscribe({
      next: (res) => {
        if (res.length > 0) {
          const chartData = res[0]; // Use only the first chart
          const ctx = document.getElementById('reportsChart') as HTMLCanvasElement;

          if (!ctx) return;

          new Chart(ctx, {
            type: 'pie',
            data: {
              labels: chartData.labels,
              datasets: [
                {
                  label: chartData.label,
                  data: chartData.data,
                  backgroundColor: chartData.backgroundColor,
                  borderColor: chartData.borderColor,
                  borderWidth: chartData.borderWidth
                }
              ]
            },
            options: {
              responsive: true,
              plugins: {
                legend: {
                  position: 'bottom',
                  labels: {
                    color: '#2c3e50',
                    font: { size: 14 }
                  }
                }
              }
            }
          });
        }
      },
      error: (err) => {
        console.error('Error loading chart data:', err);
      }
    });
  }

}

