import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UserModel } from '../models/user.model';
import { UserSessionState } from '../states/uer_session.state';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return UserSessionState.instance.user$.pipe(
      map((e)=> e != undefined),
      tap((e)=> {
        if(!UserSessionState.instance.exist){
          if(localStorage.getItem('user'))
            UserSessionState.instance.setUser( JSON.parse(localStorage.getItem('user')!) as UserModel)
          else this._router.navigate(["/"]);
        }
        else {
          if(!e) this._router.navigate(["/"]);
        }
      }),
    );
  }

}
