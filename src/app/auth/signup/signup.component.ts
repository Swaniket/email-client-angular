import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AsyncValidatorFn,
} from '@angular/forms';
import { ValidatePassword } from '../validators/validate-password';
import { ValidateUsername } from '../validators/validate-username';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    private validatePassword: ValidatePassword,
    private validateUsername: ValidateUsername
  ) {}

  authForm = new FormGroup(
    {
      username: new FormControl(
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-z0-9]+$/),
        ],
        [this.validateUsername.validate as AsyncValidatorFn]
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
      passwordConfirmation: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
    },
    { validators: [this.validatePassword.validate as ValidatorFn] }
  );

  ngOnInit(): void {}
}
