import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { json } from 'body-parser';
const adminAPI="http://localhost:3000/auth/admin/"
const adminKey="admin_key"

@Injectable({
    providedIn: 'root'
  })

  export class AdminService {
    constructor(private http:HttpClient) { }

  loginadmin(email:String,password:String):Observable<any>{
    return this.http.post(adminAPI+"login",{email,password})
  
}
public save_admin(admin:any){
  window.sessionStorage.removeItem(adminKey)
  window.sessionStorage.setItem(adminKey,JSON.stringify(admin))
}

public getAdmin(): any {
  const admin = window.sessionStorage.getItem('adminKey'); // use your actual key
  if (admin) {
    return JSON.parse(admin);
  }
  return {};
}

public getAllUsers():Observable<any>{
    return this.http.get("/getAllUsers")
    
    
}

public updateAdminProfile(adminId: string, body: { email?: string; password?: string }): Observable<any> {
  return this.http.put(`http://localhost:3000/admin/update/${adminId}`, body);
}
















}
