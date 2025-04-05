import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, retry } from 'rxjs';
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
  //sada9ni awel mara nakrah ki ysoubouli cnx 
  GetAllPVByEmetteur(id:any):Observable<any>{
    return   this.http.get(`${this.apiURL}/getAllPvDechetsByUser/${id}`)
  }
  savePvDechet(pvDechetData: any):Observable<any>{
    return this.http.post<any>(this.apiURL+"/savePvDechet",pvDechet)
  }



}

