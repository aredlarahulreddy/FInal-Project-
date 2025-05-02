import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { SigninComponent } from './SignIn/Signin.component';
import { OverviewComponent } from './overview/overview.component';
import { AnalyticsComponent } from './Analytics/Analytics.component';
import { CommonModule } from '@angular/common';
import { InsightComponent } from './Insights/Insights.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule} from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    SharedModule,
    SigninComponent,
    OverviewComponent,
    AnalyticsComponent,
    InsightComponent
  ],
  imports: [BrowserModule,HttpClientModule,CommonModule,AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent] ,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  
})
export class AppModule {}
