import { Injectable } from '@angular/core';
import { AsyncValidator, FormControl } from '@angular/forms';
import { map, catchError, of } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class ValidateUsername implements AsyncValidator {
  constructor(private authService: AuthService) {}

  validate = (control: FormControl) => {
    const { value } = control;

    return this.authService.userNameAvailable(value).pipe(
      map(() => {
        // If we come to .map() that means its a success response, so username is available
        return null;
      }),
      catchError((err) => {
        console.log('error', err);
        // Emit a new observable with nonUniqueUsername: true
        // Of is the shorthand for returing new Observable
        if (err.error.username) {
          return of({ nonUniqueUsername: true });
        }
        return of({ noConnection: true });
      })
    );
  };
}
