import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RouterService } from '../services/router.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CanactivateGuard implements CanActivate {

  constructor(
    private routerservice: RouterService,
    private authservice: AuthService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const bearerToken = localStorage.getItem('bearerToken');

    if (bearerToken != null) {
      const authStatus = this.authservice.isUserAuthenticated(bearerToken).then(
        (data) => {
          return data;
        },
        (err) => {
          console.log(err);
        });

      if (authStatus) {
        return true;
      }
    }
    else {
      this.routerservice.routeToLogin();
      return false;
    }
  }
}