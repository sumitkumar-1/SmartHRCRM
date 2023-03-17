import { Vendor } from './../interfaces/Vendor';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  apiUrl: string = environment.server + "/vendor";

  constructor(private http: HttpClient) { }

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
