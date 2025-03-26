import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  apiUrl ="http://localhost:3000/categorie"
  constructor(private http : HttpClient) { }
  getAllCategories(data : any): Observable<any>{
    return this.http.get<any>(this.apiUrl+'/getAllCategories',data)
  }
}
