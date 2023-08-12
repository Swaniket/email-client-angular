import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface IUsernameAvailabeResponse {
  available: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  userNameAvailable(username: string) {
    return this.http.post<IUsernameAvailabeResponse>(
      'https://api.angular-email.com/auth/username',
      {
        username,
      }
    );
  }
}
