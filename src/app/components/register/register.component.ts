import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';

import { User } from 'src/app/user';

function emailMatcher(c: AbstractControl): { [key: string] : boolean } | null {
  const emailControl = c.get('email1')
  const confirmControl = c.get('email2')

  if (emailControl?.pristine || confirmControl?.pristine) {
    return null;
  }

  if (emailControl?.value === confirmControl?.value) {
    return null;
  }
  return { 'match': true }
}

function passwordMatcher(c: AbstractControl): {[key: string] : boolean} | null {
  const passwordControl = c.get('password1');
  const confirmPassControl = c.get('password2');

  if (passwordControl?.pristine || confirmPassControl?.pristine) {
    return null
  }

  if(passwordControl?.value === confirmPassControl?.value) {
    return null
  }
  return { 'match': true}
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  signinForm!: FormGroup;
  user = new User();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });

    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      surname: ['', [Validators.required, Validators.minLength(2)]],
      registerEmailGroup: this.fb.group({
        email1: ['', [Validators.required, Validators.email]],
        email2: ['', [Validators.required]],
      }, {}),
      registerPasswordGroup: this.fb.group({
        password1: ['', [Validators.required, Validators.minLength(8)]],
        password2: ['', Validators.required],
      }, {validator: passwordMatcher}),
    });

  }

  save() {
    console.log(this.registerForm);
    console.log('Saved: ' + JSON.stringify(this.registerForm.value));
  }

  getErrorMessage() {
    if (
      this.signinForm.get('email')?.hasError('required') ||
      this.signinForm.get('password')?.hasError('required')
    ) {
      return 'You must enter a value';
    }

    return this.signinForm.get('email')?.hasError('email')
      ? 'Not a valid email'
      : '';
  }
}
