import { Component } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import action from '../helper/action';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './Signin.component.html',
  styleUrls: ['./Signin.component.css']
})
export class SigninComponent {
  username = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    const token = action.getToken()
    if (token) {
      this.router.navigate(['/overview']);
    }
  }

  login() {

    this.auth.login(this.username, this.password).subscribe({
      next: () => { },
      error: (err) => {
        this.error = 'Invalid username or password';
        console.error('Login error:', err);
      }
    });
  }
}