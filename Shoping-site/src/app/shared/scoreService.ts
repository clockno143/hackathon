import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import{catogoryIf}  from '../home/catogory'
import { Observable, throwError,Subscriber} from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';



@Injectable(
    {
        providedIn:'root'
    }
)
export class scoreService
{
 url:string=" http://localhost:5001/teams"
 url1:string="http://localhost:5001/change"
 url3:string="http://localhost:5001/judge_s"
 teams:catogoryIf[]=[]
 push_data:any={}

  httpOptions = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*',
      'Authorization':'authkey',
      'userid':'1'
    })
  };

    constructor(private http: HttpClient) { }
    
     get_teams_ob():Observable<catogoryIf[]>
    {
      return  this.http.get<catogoryIf[]>(this.url).pipe(tap(data=>console.log(JSON.stringify(data))))
    }
    get_judg_scores(data:any):Observable<catogoryIf[]>
    {
      return  this.http.post<catogoryIf[]>(this.url3,data)
    }
    
    set_teams()
    {
    
        return this.http.post(this.url1,this.push_data)
    
        
    }
    
    
}


