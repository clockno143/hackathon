import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { inject } from "@angular/core/testing";
import { Observable, throwError,Subscriber} from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

@Injectable(
    {
providedIn:'root'
    }
)
export class loginService
{
    username:string=""
    constructor(private http: HttpClient) { }
    
    url:string=" http://localhost:5001/judge"

 get_judge_ob(data:any):Observable<any>
    {
        
      return  this.http.post<any>(this.url,data)
      
    }
}