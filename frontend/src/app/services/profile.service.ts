import { Profile } from './../interfaces/Profile';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  apiUrl!: string;

  constructor(private http: HttpClient, private configService: ConfigService) { 
    this.configService.getBackendUrl().then(backendUrl => {
      console.log(backendUrl);
      this.apiUrl = backendUrl + '/profile';
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

  createProfile(profile: Profile): Observable<any> {
    return this.http.post(this.apiUrl, profile, this.getHeader());
  }

  getProfileByUserId(userid: string): Observable<any> {
    return this.http.get(this.apiUrl + '/user/' + userid, this.getHeader());
  }

  getProfiles() : Observable<any> {
    return this.http.get(this.apiUrl, this.getHeader());
  }

  getProfileById(id: string) : Observable<any> {
    return this.http.get(this.apiUrl + '/' + id, this.getHeader());
  }
}
