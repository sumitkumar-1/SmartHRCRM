import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private configUrl = 'assets/config.json';

  constructor(private http: HttpClient) { }

  getBackendUrl() {
    return this.http.get(this.configUrl)
      .toPromise()
      .then((config: any) => config.backendUrl);
  }
  
}
