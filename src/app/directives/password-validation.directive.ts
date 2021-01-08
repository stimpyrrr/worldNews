import { Directive } from '@angular/core';
import { Validator, ValidatorFn, AbstractControl, NG_VALIDATORS, Validators } from '@angular/forms';

export function passwordValidation(): ValidatorFn {
  return (control: AbstractControl) => {
    const passwordValidationDirective = new PasswordValidationDirective();
    return passwordValidationDirective.validate(control);
  }
}

@Directive({
  selector: '[appPasswordValidation]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PasswordValidationDirective, multi: true}]
})
export class PasswordValidationDirective implements Validator{

  constructor() { }

  validate(control: import("@angular/forms").AbstractControl): import("@angular/forms").ValidationErrors {
    const password = <string>control.value;
    // console.log('password validation --> ', password);
    if(!password) { return; }
    if(password === password.toLowerCase()){
      return{'passwordValidation': {'message': 'el password debe contener máyusculas'}} 
    }
    if(password === password.toUpperCase()){
      return{'passwordValidation': {'message': 'el password debe contener minusculas'}} 
    }
    if(!/\d/.test(password)){
      return{'passwordValidation': {'message': 'el password debe contener un carácter numérico'}} 
    }
    return null;
  }

}
