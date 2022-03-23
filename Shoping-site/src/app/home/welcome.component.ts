import { Component } from '@angular/core';
import {catogoryIf} from './catogory';
import { scoreService } from '../shared/scoreService';
import { loginService } from '../Login Page/loginService';
import { Router } from '@angular/router';
import { browserRefresh } from '../app.component';
@Component({
  selector:'pm-home',
  templateUrl: './welcome.component.html',
  styleUrls:['./welcome.component.css']
})
export class WelcomeComponent {
  public pageTitle = 'Welcome';
  no_teams:any[]=[1,2,3,4,5,6,7,8,9];
  teams:catogoryIf[]=[]
  judge:boolean=true
  browserRefresh!:boolean
constructor(private scoreService: scoreService,private login:loginService,private router:Router)
  {}


  ngOnInit()
  {
    this.browserRefresh = browserRefresh;
    if (this.browserRefresh==true)

  {
    console.log("he");
    
  }
    
    if( this.login.username.match("eurofins"))
   {
    this.judge=false
     
     
   
     
   }

    this.scoreService.get_teams_ob().subscribe({next:teams=>{this.teams=teams;
      this.scoreService.teams=this.teams; }})
 
  }
  
}
