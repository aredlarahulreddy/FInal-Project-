import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './authentication/auth.service'; 
// import {HttpClientModule} from '@angular/common/http'


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(public auth: AuthService) {}
  title = 'project';
  logout() {
    this.auth.logout();
  }
} 
