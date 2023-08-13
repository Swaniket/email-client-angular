import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';

interface IUsernameAvailabeResponse {
  available: boolean;
}

interface ISignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface ISignupResponse {
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  rootURL = 'https://api.angular-email.com';
  isSignedIn = new BehaviorSubject(false);

  constructor(private http: HttpClient) {}

  userNameAvailable(username: string) {
    return this.http.post<IUsernameAvailabeResponse>(
      `${this.rootURL}/auth/username`,
      {
        username,
      }
    );
  }

  signUp(credentials: ISignupCredentials): Observable<ISignupResponse> {
    return this.http
      .post<ISignupResponse>(`${this.rootURL}/auth/signup`, credentials)
      .pipe(
        tap(() => {
          this.isSignedIn.next(true);
        })
      );
  }
}
