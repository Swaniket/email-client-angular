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

interface IIsSignedInResponse {
  authenticated: boolean;
  username: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // withCredentials: true is required to presist the cookie, by default, angular discards the cookies
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

  checkAuthStatus() {
    return this.http
      .get<IIsSignedInResponse>(`${this.rootURL}/auth/signedin`)
      .pipe(
        tap(({ authenticated }) => {
          this.isSignedIn.next(authenticated);
        })
      );
  }
}
