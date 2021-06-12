import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppState } from '../states/app.state';
import { ScreenModel } from '../models/incident.models';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  page = 'screen';
  constructor(private http: HttpClient) { }

  getIncident() {
    return this.http.get<ScreenModel[]>( `${AppState.apibaseurl}${this.page}`).toPromise();
  }
  getScreenContent(screen: string){
    return this.http.get<ScreenModel[]>( `${AppState.apibaseurl}screencontent/`+screen).toPromise();
  }

  postIncident(data: ScreenModel) {
    return this.http.post( `${AppState.apibaseurl}${this.page}`, data).toPromise();
  }
}
