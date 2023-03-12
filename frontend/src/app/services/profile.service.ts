import { Profile } from './../interfaces/Profile';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  apiUrl: string = environment.server + "/profile";

  constructor(private http: HttpClient) { }

  getHeader() {
    const options = {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem('token') ?? ''
      })
    };
    return options;
  }

  createProfile(profile: Profile): Observable<any> {
    return this.http.post(this.apiUrl, profile, this.getHeader());
  }
}
