import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { pvDechet } from '../model/pvDechet';

@Injectable({
  providedIn: 'root'
})
export class PvDechetServiceService {
  private apiURL = "http://localhost:3000/pvDechet"; // ✅ Define inside the class

  constructor(private http: HttpClient) {}

  addPvDechet(pvDechetData: any): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/createPvDechet`, pvDechetData); // ✅ Use apiURL
  }
}
