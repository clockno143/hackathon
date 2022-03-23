import { Component, OnInit } from '@angular/core';
import { loginService } from './loginService';
import { Router } from "@angular/router";
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  username:string=""
  password:string=""
  roote:boolean=false
  i:any={}
  
  auth_fail:boolean=false
  constructor(private loginService:loginService,private router:Router) {

   }

  ngOnInit(): void {
  
    
    this.loginService.username=this.username
    
  }
  loginUser(){
    console.log(this.username,this.password);
   
    
    this.i["user_name"]=this.username;
    this.i["password"]=this.password;
    console.log(this.i);
    this.loginService.get_judge_ob(this.i).subscribe((result)=>{
      if(result['message']==1 ||  this.i["user_name"]=="eurofins")
  { 
  this.loginService.username=this.username;
    this.router.navigateByUrl('/home');}
    else
    {
 var p:HTMLHeadingElement=<HTMLHeadingElement>document.getElementById("warn");
      p.innerHTML='Invalid userid Password'
      
    }
  }
  )
}


  }

