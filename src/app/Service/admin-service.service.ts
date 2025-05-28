import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../model/admin';
@Injectable({
  providedIn: 'root'
})

export class AdminServiceService {
  private AuthURL = 'http://localhost:3000/auth/admin';
  private adminURL = 'http://localhost:3000/admin';
  private adminkey = 'key_admin';
  constructor(private http: HttpClient ) {}

//login 
  login(email: string, password: string) {
    return this.http.post<any>(`${this.AuthURL}/login`, { email, password });
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

  // Delete User 
  deleteUser(id: string) {
    return this.http.delete<any>(`${this.adminURL}/deleteUser/${id}`);
  }
  // Get COunt of all PV :
  countAllPV() {
    return this.http.get<any>(`${this.adminURL}/getDechetCount`);
  }
  getALlPVHistory() {
    return this.http.get<any>(`${this.adminURL}/getAllPvHistory`);
  }
  CreateNewAdmin(admin: Admin) {
    return this.http.post<any>(`${this.adminURL}/CreateAdmin`, admin);
  }

CreateUser(user: any) {
  return this.http.post<any>(`${this.adminURL}/CreateUser`, user);
}
updateAdminProfile(adminId: string, data: { email?: string; password?: string }) {
  return this.http.put<any>(`${this.adminURL}/update/${adminId}`, data);
}

}
