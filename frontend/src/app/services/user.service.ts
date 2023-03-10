import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { User } from './../interfaces/Users';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: string = environment.server + "/users";

  constructor(private http: HttpClient) { }

  registerUser(user: User): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  login(data: any): Observable<any> {
    return this.http.post(environment.server + '/login', data);
  }

  logout(): Observable<any> {
    return this.http.post(environment.server + '/logout', {});
  }
}
