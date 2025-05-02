import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../authentication/auth.service';
import action from '../helper/action';
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (!action.getToken()) {
      this.router.navigate(['/signin']);
      return false;
    }
    return true;
  }
}
