import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface IEmailSummary {
  id: string;
  subject: string;
  from: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  rootURL = 'https://api.angular-email.com';

  constructor(private http: HttpClient) {}

  getAllEmails() {
    return this.http.get<IEmailSummary[]>(`${this.rootURL}/emails`);
  }
}
