import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AsyncValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { ValidatePassword } from '../validators/validate-password';
import { ValidateUsername } from '../validators/validate-username';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    private validatePassword: ValidatePassword,
    private validateUsername: ValidateUsername,
    private authService: AuthService
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

  convertToFormControl(absCtrl: AbstractControl | null): FormControl {
    const ctrl = absCtrl as FormControl;
    return ctrl;
  }

  onSubmit() {
    // @TODO: Show notification if can't submit
    if (this.authForm.invalid) return;

    const submitValue = this.authForm.value;
    this.authService.signUp(submitValue).subscribe({
      next: (response) => {
        // @TODO: Navigate to some other route
        // @TODO: Show notification
      },
      error: (err) => {
        if (err.status === 0) {
          this.authForm.setErrors({ noConnection: true });
        } else {
          this.authForm.setErrors({ unknownError: true });
        }
      },
    });
  }
}
