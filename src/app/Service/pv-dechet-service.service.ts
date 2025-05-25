import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { pvDechet } from '../model/pvDechet'; // Ensure this file exists or adjust the path

@Injectable({
  providedIn: 'root'
})
export class PvDechetServiceService {
  private apiURL = "http://localhost:3000/pvDechet";

  constructor(private http: HttpClient) {}

  addPvDechet(pvDechetData: any): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/createPvDechet`, pvDechetData);
  }

  GetAllPVByEmetteur(id: any): Observable<any> {
    return this.http.get(`${this.apiURL}/getAllPvDechetsByUser/${id}`);
  }

  savePvDechet(pvDechetData: any): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/savePvDechet`, pvDechetData);
  }

  fromSavedtoValidate(id: any): Observable<any> {
    return this.http.put<any>(`${this.apiURL}/fromSavedtoValidated/${id}`, {});
  }

  getPvDechetById(pvDechetId: any): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/getPvDechetById/${pvDechetId}`);
  }

  modifyPv(pvId: string, data: any): Observable<any> {
    return this.http.put(`${this.apiURL}/modifyPvDechet/${pvId}`, data);
  }

  getPvDechetsByAQ(): Observable<pvDechet[]> {
    return this.http.get<pvDechet[]>(`${this.apiURL}/getPvDechetsByAQ`);
  }

  validatePvByAQ(pvDechetId: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiURL}/validatePvByAQ/${pvDechetId}`, data);
  }

  getPvValidesParAQ(): Observable<pvDechet[]> {
    return this.http.get<pvDechet[]>(`${this.apiURL}/getValidatedPvByAQ`);
  }
  getPvDechetsForHSE(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/getPvDechetsForHSE`);
  }

  // Get validated PVs by HSE
  getValidatedPvByHSE(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}/getValidatedPvByHSE`);
  }

  // Validate a PV by HSE
  validatePvByHSE(pvDechetId: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiURL}/validatePvByHSE/${pvDechetId}`, data);
  }

 


  downloadDechetPdf(pvDechetId: string): Observable<Blob> {
    return this.http.get(`${this.apiURL}/generateDechetPdf/${pvDechetId}`, {
      responseType: 'blob'
    });
  }
}


