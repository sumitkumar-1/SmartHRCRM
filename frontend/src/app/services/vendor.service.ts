import { Vendor } from './../interfaces/Vendor';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  apiUrl!: string;

  constructor(private http: HttpClient, private configService: ConfigService) { 
    this.configService.getBackendUrl().then(backendUrl => {
      console.log(backendUrl);
      this.apiUrl = backendUrl + '/vendor';
    })
  }

  getHeader() {
    const options = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token') ?? ''
      })
    };
    return options;
  }

  createVendor(vendor: Vendor): Observable<any> {
    return this.http.post(this.apiUrl, vendor, this.getHeader());
  }

  getVendors() : Observable<any> {
    return this.http.get(this.apiUrl, this.getHeader());
  }

  getVendorById(id: string) : Observable<any> {
    return this.http.get(this.apiUrl + '/' + id, this.getHeader());
  }
}
