import { Observable } from 'rxjs';
import { User } from './../interfaces/Users';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl!: string;
  backendUrl!: string;

  constructor(private http: HttpClient, private configService: ConfigService) { 
    this.configService.getBackendUrl().then(backendUrl => {
      console.log(backendUrl);
      this.backendUrl = backendUrl;
      this.apiUrl = backendUrl + '/users';
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

  registerUser(user: User): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  getUsers() : Observable<any> {
    return this.http.get(this.apiUrl, this.getHeader());
  }

  getUserById(id: string) : Observable<any> {
    return this.http.get(this.apiUrl + '/' + id, this.getHeader());
  }

  login(data: any): Observable<any> {
    return this.http.post(this.backendUrl + '/login', data);
  }

  logout(): Observable<any> {
    return this.http.post(this.backendUrl + '/logout', {});
  }
}
