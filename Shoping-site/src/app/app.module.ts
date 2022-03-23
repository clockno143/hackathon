import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import {CheckboxModule} from 'primeng-lts/checkbox';
import { AppComponent } from './app.component';

import { WelcomeComponent } from './home/welcome.component';

import{SimpleNotificationsModule} from 'angular2-notifications'
import { NotificationsService } from 'angular2-notifications';
import {TableModule} from 'primeng-lts/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { loginService } from './Login Page/loginService';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import {RatingModule} from 'primeng-lts/rating';
import {DataViewModule} from 'primeng-lts/dataview';
import {DropdownModule} from 'primeng-lts/dropdown';
import {ButtonModule} from 'primeng-lts/button';
import {ToastModule} from 'primeng-lts/toast';
import { scoreComponent } from './score/score.component';
import {InputNumberModule} from 'primeng-lts/inputnumber';
import{scoreService} from './shared/scoreService'
import{LoginPageComponent} from './Login Page/login-page.component'
import { AuthGuard } from './auth.guard';
import { MessageService } from 'primeng-lts/api';
import { OrganizerComponent } from './organizer/organizer.component';
@NgModule({
  declarations: [
    AppComponent,WelcomeComponent,scoreComponent,LoginPageComponent, OrganizerComponent
  ],
  imports: [
    InputNumberModule,HttpClientModule,TableModule,CheckboxModule,
    ToastModule,ButtonModule,BrowserModule,FormsModule,  BrowserAnimationsModule,RatingModule,DataViewModule,DropdownModule,
    RouterModule.forRoot
    (
      [ {path:'log-in',component:LoginPageComponent},
         {path:'organizer',component:OrganizerComponent},
        {path:'score',component:scoreComponent,canActivate:[AuthGuard]},
        {path:'home',component:WelcomeComponent,canActivate:[AuthGuard]},
        {path:"",redirectTo:'log-in',pathMatch:'full'},
        {path:"**",redirectTo:'log-in',pathMatch:'full'}
      ]
    )
    
  ],
  bootstrap: [AppComponent],
providers:[scoreService, loginService,MessageService] 

})
export class AppModule { }
