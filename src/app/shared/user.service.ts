import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { UserModel } from '../models/user.model';
import { AppState } from '../states/app.state';
import { UserSessionState } from '../states/uer_session.state';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  _headers = {
    Authorization : 'Bearer ' + AppState.userSessiontoken.value,
    accept: 'application/json'
  };
  constructor(private http: HttpClient) { }

  Authenticate(login: {name: string; password: string;}) {
    return this.http.get<UserModel>(`${AppState.apibaseurl}${"user/authenticate"}`,
    {
      params:{
        name : login.name,
        password: login.password
      }
    }).pipe(tap((e)=> AppState.userSessiontoken.next(e.id))).toPromise();
  }

  Create(data: {name: string; password: string;}) {
    return this.http.post( `${AppState.apibaseurl}/user/create`, data).toPromise();
  }
  update(data: {name: string; password: string;}) {
    return this.http.put( `${AppState.apibaseurl}/user/update`, data, {
      headers : this._headers
    }).pipe(tap(
      (e)=> {
        var user = UserSessionState.instance.user;
        user!.name = data.name;
        UserSessionState.instance.setUser(user!);
      })).toPromise();
  }
}
