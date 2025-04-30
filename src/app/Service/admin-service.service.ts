import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AdminServiceService {
  private AuthURL = 'http://localhost:3000/adminAuth';
  private adminURL = 'http://localhost:3000/admin';
  private adminkey = 'key_admin';
  constructor(private http: HttpClient ) {}

//login 
  login(email: string, password: string) {
    return this.http.post<any>(`${this.AuthURL}/Login`, { email, password });
  }
//Save admin
  saveAdmin(admin: any) {
    window.sessionStorage.removeItem('key_admin');
    window.sessionStorage.setItem(this.adminkey, JSON.stringify(admin));
  }

//Get admin
  public getAdmin(): any {
    const admin = window.sessionStorage.getItem(this.adminkey);
    if (admin) {
      return JSON.parse(admin);
    }
    return {};
  }
  //lougout 
  logout() {
    window.sessionStorage.removeItem(this.adminkey);
  }


  // Count all users 
  countAllUsers() {
    return this.http.get<any>(`${this.adminURL}/countUsers`);
  }

  // Get all users
  getAllUsers() {
    return this.http.get<any>(`${this.adminURL}/getAllUsers`);
  }
}
