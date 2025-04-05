import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { json } from 'body-parser';
const authAPI="http://localhost:3000/auth/"
const userKey="key_user"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  loginUser(email:String,password:String):Observable<any>{
    return this.http.post(authAPI+"Login",{email,password})
  }
  public save_user(user:any){
    window.sessionStorage.removeItem(userKey)
    window.sessionStorage.setItem(userKey,JSON.stringify(user))
  }
  public getUser():any{
    const user=window.sessionStorage.getItem(userKey)
    if(user){
      return JSON.parse(user)

    }
    return{}
  }
  forgetPassword(email:String):Observable<any>{
    return this.http.post(authAPI+'forgetPassword',{email})
  }
  resetPassword(token:any,newpassword : String):Observable<any>{
    return this.http.post(authAPI+`resetPassword/${token}`,{newpassword})
  }
}
