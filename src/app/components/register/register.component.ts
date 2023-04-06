import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';

import { User } from 'src/app/user';

function emailMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const emailControl = c.get('email1');
  const confirmControl = c.get('email2');

  if (emailControl?.pristine || confirmControl?.pristine) {
    return null;
  }

  if (emailControl?.value === confirmControl?.value) {
    return null;
  }
  return { match: true };
}

function passwordMatcher(
  c: AbstractControl
): { [key: string]: boolean } | null {
  const passwordControl = c.get('password1');
  const confirmPassControl = c.get('password2');

  if (passwordControl?.pristine || confirmPassControl?.pristine) {
    return null;
  }

  if (passwordControl?.value === confirmPassControl?.value) {
    return null;
  }
  return { match: true };
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

  private validationMessages: { [key: string]: { [key: string]: string } };

  constructor(private fb: FormBuilder) {
    this.validationMessages = {
      email: {
        required: 'Email is required.',
        email: 'Not a valid email',
      },
      password: {
        required: 'Password is required.',
        minlength: 'Product name must be at least eight characters.'
      },
      firstName: {
        required: 'Name is required.',
        minlength: 'Name must be at least two characters.'
      },
      surname: {
        required: 'Surname is required.',
        minlength: 'Name must be at least two characters.'
      },
      registerEmailGroup: {
        required:'Email is required.',
        email: 'Not a valid email',
        match: 'Email does not match'
      },
      registerPasswordGroup: {
        required: 'Password is required.',
        minlength: 'Product name must be at least eight characters.',
        match: 'Password does not match'
      }
    };
  }

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });

    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      surname: ['', [Validators.required, Validators.minLength(2)]],
      registerEmailGroup: this.fb.group(
        {
          email1: ['', [Validators.required, Validators.email]],
          email2: ['', [Validators.required]],
        },
        { validators: emailMatcher }
      ),
      registerPasswordGroup: this.fb.group(
        {
          password1: ['', [Validators.required, Validators.minLength(8)]],
          password2: ['', Validators.required],
        },
        { validators: passwordMatcher }
      ),
    });
  }

  save() {
    console.log(this.registerForm);
    console.log('Saved: ' + JSON.stringify(this.registerForm.value));
  }

  getErrorMessage() {
    if (
      this.signinForm.get('email')?.hasError('required') ||
      this.signinForm.get('password')?.hasError('required') ||
      this.registerForm.get('firstName')?.hasError('required') ||
      this.registerForm.get('surname')?.hasError('required') ||
      this.registerForm.get('registerEmailGroup.email1')?.hasError('required') ||
      this.registerForm.get('registerEmailGroup.email2')?.hasError('required') ||
      this.registerForm.get('registerPasswordGroup.password1')?.hasError('required') ||
      this.registerForm.get('registerPasswordGroup.password2')?.hasError('required')
    ) {
      return 'You must enter a value';
    }
    if (
      this.signinForm.get('email')?.hasError('email') ||
      this.registerForm.get('registerEmailGroup.email1')?.hasError('email')
    ) {
      return 'Not a valid email';
    }
    if (
      this.registerForm.get('firstName')?.hasError('minLength') ||
      this.registerForm.get('surname')?.hasError('minLength')
    ) {
      return 'Entry must be at least 2 characters';
    }
    if (
      this.signinForm.get('password')?.hasError('minLenght') ||
      this.registerForm.get('registerPasswordGroup.password1')?.hasError('minLenght')
    ) {
      return 'Password must be at least 8 characters long';
    }
    if (this.registerForm.get('registerEmailGroup.email2')?.hasError('match')) {
      return 'Email does not match';
    }
    if (this.registerForm.get('registerPasswordGroup.password2')?.hasError('match')) {
      return 'Password does not match';
    }
    return '';
  }
}
