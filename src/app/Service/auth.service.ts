import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { json } from 'body-parser';
const authAPI="http://localhost:3000/auth/"
const userKey="key_user"
const useApi = "http://localhost:3000/user/"

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
  
  logout() {
    window.sessionStorage.removeItem(userKey);
  }
  
    // Existing methods and properties
  
    login(credentials: { email: string; password: string }): Observable<any> {
      // Implement the login logic here, e.g., make an HTTP request to the backend
      return this.http.post('/api/login', credentials);
    }

    updateUser(id : string, userData: any): Observable<any> {
      // Implement the update user logic here, e.g., make an HTTP request to the backend
      return this.http.put(`${useApi}/updateUser/${id}`, userData);
    }
  }
  

