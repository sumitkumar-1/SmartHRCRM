import { Demand } from './../interfaces/Demand';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DemandService {

  apiUrl: string = environment.server + "/demand";

  constructor(private http: HttpClient) { }

  getHeader() {
    const options = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token') ?? ''
      })
    };
    return options;
  }

  createDemand(demand: Demand): Observable<any> {
    return this.http.post(this.apiUrl, demand, this.getHeader());
  }

  getDemands() : Observable<any> {
    return this.http.get(this.apiUrl, this.getHeader());
  }

  getDemandById(id: string) : Observable<any> {
    return this.http.get(this.apiUrl + '/' + id, this.getHeader());
  }
}
