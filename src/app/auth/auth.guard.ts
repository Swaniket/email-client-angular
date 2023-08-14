import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable, take, skipWhile, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // Only emit either true or false from the authService, skip the null value
    return this.authService.isSignedIn.pipe(
      skipWhile((value) => value === null),
      take(1),
      tap((isAuthenticated) => {
        if (!isAuthenticated) this.router.navigateByUrl('/');
      })
    );
  }
}
