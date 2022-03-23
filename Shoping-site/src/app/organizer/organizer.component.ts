import { HttpClient } from "@angular/common/http";
import { MessageService } from "primeng-lts/api";
import { Observable, throwError,Subscriber} from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { Component } from '@angular/core';
import {catogoryIf} from '../home/catogory';
import { scoreService } from '../shared/scoreService';
import { loginService } from '../Login Page/loginService';
import { Router } from '@angular/router';
import { ToastModule } from "primeng-lts/toast";
@Component({
  selector: 'pm-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.css']
})
export class OrganizerComponent  {
  public pageTitle = 'Welcome';
  t:boolean=false
  team_selection:boolean[]=[false,false,false,false,false,false,false,false,false,false]
  teams:catogoryIf[]=[]
  judge:boolean=true
  team!:catogoryIf
  selected_teams:any[]=[]
constructor(private scoreService: scoreService,private login:loginService,private router:Router,private http:HttpClient,private messageService:MessageService)
  {}
  url:string=" http://localhost:5001/round2_teams"
  url_round:string=" http://localhost:5001/round"
  ngOnInit()
  {
   
  
    
    if( this.login.username.match("eurofins"))
   {
    
     
   }

    this.scoreService.get_teams_ob().subscribe({next:teams=>{this.teams=teams;
      this.scoreService.teams=this.teams; }})
 
  }
  
  select()
  {
    console.log(this.team_selection);
    console.log(this.teams[0]);
    for(let i=0;i<10;i++)
    {
      if(this.team_selection[i])
      { this.team=this.teams[i]
       this.team.Business_Value=0
       this.team.Idea_and_Usability=0
       this.team.Implementation=0
       this.team.Innovation=0
       this.team.Team_Presentation=0
       this.team.Total=0
      this.selected_teams.push(this.team)}
      
    }
    
    
    if((this.selected_teams.length)<1)
    
    this.messageService.add({severity:'error', summary: 'Error', detail: "No Team selected "});
    else
    {
      this.post_data().subscribe(data=>console.log(data));
    
     this.selected_teams=[] 
    this.post_round(2).subscribe(data=>{
      this.messageService.add({severity:'success', summary: 'Success', detail: data['message']});
    })
  this.ngOnInit()
  }
    console.log(this.selected_teams);
    
  }

  select_round1()
  {
    this.post_round(1).subscribe(data=>{
      this.messageService.add({severity:'success', summary: 'Success', detail: data['message']});
    })
  }


  post_data():Observable<any>
  {
    return this.http.post(this.url,this.selected_teams) 
  }
  post_round(no:number):Observable<any>
  {
    let data={"round":no}
    return this.http.post(this.url_round,data)
     
   
  }
   
  
  
}
