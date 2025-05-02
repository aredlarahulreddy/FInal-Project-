// import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './SignIn/Signin.component';
import { OverviewComponent } from './overview/overview.component';
import { AnalyticsComponent } from './Analytics/Analytics.component';
import {InsightComponent } from './Insights/Insights.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent },
  { path: 'overview', component: OverviewComponent , canActivate: [AuthGuard] },
  { path: 'analytics', component: AnalyticsComponent, canActivate: [AuthGuard] },
  { path: 'insights', component: InsightComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'overview' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}