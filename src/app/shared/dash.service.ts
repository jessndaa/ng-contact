import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppState } from '../states/app.state';

@Injectable({
  providedIn: 'root'
})
export class DashService {

  page = 'status';
  constructor(private http: HttpClient) { }

  getIncident() {
    return this.http.get<any[]>( `${AppState.apibaseurl}${this.page}`);
  }

  postIncident(data: any) {
    return this.http.post( `${AppState.apibaseurl}${this.page}`, data).toPromise();
  }
}
