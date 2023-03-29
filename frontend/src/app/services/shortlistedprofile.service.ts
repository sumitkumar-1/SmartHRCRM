import { ShortListedProfile } from './../interfaces/ShortListedProfile';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ShortlistedprofileService {
  
  apiUrl!: string;

  constructor(private http: HttpClient, private configService: ConfigService) { 
    this.configService.getBackendUrl().then(backendUrl => {
      console.log(backendUrl);
      this.apiUrl = backendUrl + '/shortlistedprofile';
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

  createShortListedProfile(profile: ShortListedProfile): Observable<any> {
    return this.http.post(this.apiUrl, profile, this.getHeader());
  }

  getShortListedProfiles() : Observable<any> {
    return this.http.get(this.apiUrl, this.getHeader());
  }

  getShortListedProfileById(id: string) : Observable<any> {
    return this.http.get(this.apiUrl + '/' + id, this.getHeader());
  }
}
