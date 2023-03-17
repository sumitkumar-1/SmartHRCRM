import { DemandHandler } from './../interfaces/DemandHandler';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DemandhandlerService {

  apiUrl: string = environment.server + "/demandhandler";

  constructor(private http: HttpClient) { }

  getHeader() {
    const options = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token') ?? ''
      })
    };
    return options;
  }

  createDemandHandler(demandHandler: DemandHandler): Observable<any> {
    return this.http.post(this.apiUrl, demandHandler, this.getHeader());
  }

  getDemandHandlers() : Observable<any> {
    return this.http.get(this.apiUrl, this.getHeader());
  }

  getDemandHandlerById(id: string) : Observable<any> {
    return this.http.get(this.apiUrl + '/' + id, this.getHeader());
  }
}
