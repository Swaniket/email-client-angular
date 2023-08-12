import { Injectable } from '@angular/core';
import { Validator, FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidatePassword implements Validator {
  validate(formGroup: FormGroup) {
    const { password, passwordConfirmation } = formGroup.value;

    if (password === passwordConfirmation) return null;
    return { passwordsDontMatch: true };
  }
}
