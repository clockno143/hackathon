import { style } from "@angular/animations";
import { Component } from "@angular/core";
import {MessageService} from 'primeng-lts/api';
import {SpinnerModule} from 'primeng-lts/spinner';
import {InputNumberModule} from 'primeng-lts/inputnumber'
import { catogoryIf } from "../home/catogory";
import { scoreService } from '../shared/scoreService';
import { loginService } from "../Login Page/loginService";

@Component
({
    templateUrl:'./score.component.html',
    styleUrls:['./score.component.css']
}

)
export class scoreComponent
{  
    
    score_edit:any={};
    sub_dict:any={}
    data:any={"Judge_Name":this.login.username}
    val:string="0";
    teams:catogoryIf[]=[]
    constructor(private scoreService:scoreService,private login:loginService,private messageService:MessageService)
    {}






    
    ngOnInit()
    {
        console.log(this.data);
        
        this.scoreService.get_judg_scores(this.data).subscribe((result)=>{
            this.teams=result;
            console.log(result);
            
        })
    }
    save()
    {
     
      this.scoreService.set_teams().subscribe((result)=>console.log(result))
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Saved'});
      
    }
    onChange(event :any,team_name:string):void
    { let name =event.name
        try
        {
          this. sub_dict= this.score_edit[team_name]
          this.score_edit[team_name][name]= event.value
        }
        catch
        {
            
         
            this.score_edit[team_name]={}
            this.score_edit[team_name][name]=event.value
            
        }
        this.score_edit["Judge_Name"]=this.data["Judge_Name"]
        
        console.log(this.score_edit);
        
       this.scoreService.push_data=this.score_edit
        
        

}
}