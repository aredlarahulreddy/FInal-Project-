import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import action from '../helper/action';
@Component({
  selector: 'app-dashboard',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']

})
export class OverviewComponent {
  username: string | null = '';

  constructor(public auth: AuthService, private cdref: ChangeDetectorRef) { }
  title = 'project';


  ngAfterViewInit() {
    this.username = action.getLoggedInUserName();
    this.cdref.detectChanges(); // manually trigger change detection
  }


  ngOnInit(): void {
    // const user = this.auth.getLoggedInUser();
    this.username = action.getLoggedInUserName();
  }
  logout() {
    this.auth.logout();
  }
}
