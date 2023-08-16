import { Component, OnInit } from '@angular/core';
import { EmailService } from '../service/email.service';

interface IEmailSummary {
  id: string;
  subject: string;
  from: string;
}

@Component({
  selector: 'app-email-index',
  templateUrl: './email-index.component.html',
  styleUrls: ['./email-index.component.css'],
})
export class EmailIndexComponent implements OnInit {
  emails!: IEmailSummary[];

  constructor(private emailService: EmailService) {}

  ngOnInit(): void {
    this.emailService.getAllEmails().subscribe((emails) => {
      this.emails = emails;
    });

    console.log('emails', this.emails);
  }
}
