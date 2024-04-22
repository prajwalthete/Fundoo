/**
 * The `AuthguardService` is a service that implements the `CanActivate` interface to control access
 *  to routes in an Angular application.
 *
 * This service checks if the user has a valid authentication token stored in the browser's local storage.
 *  If the token is present, the user is allowed to access the requested route. If the token is not present,
 *  the user is redirected to the login page.
 *
 * This service is typically used in conjunction with Angular's routing system to protect sensitive routes
 *  from unauthorized access.
 */
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthguardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    routerSnapshot: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    if (localStorage.getItem('AuthToken')) {
      return true;
    } else {
      // Navigate to '/login'
      return this.router.createUrlTree(['']);
    }
  }
}
