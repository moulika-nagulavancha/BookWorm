import { Injectable } from '@angular/core';
import {
  CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,
  Router, CanActivateChild, CanLoad, Route, UrlSegment
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate, CanActivateChild, CanLoad {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    throw new Error('Method not implemented.');
  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    throw new Error('Method not implemented.');
  }
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    throw new Error('Method not implemented.');
  }

}
