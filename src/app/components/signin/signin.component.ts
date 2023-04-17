import { Component, OnInit } from '@angular/core';
import {
  FormGroup, 
  FormBuilder,
  Validators
} from '@angular/forms';
import { User } from 'src/app/user';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signinForm!: FormGroup;
  user: User = new User();

  constructor (private fb: FormBuilder) {}

 ngOnInit(): void {
  this.signinForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })
 }
  getErrorMessage() {
    if (this.signinForm.get('email')?.hasError('required') || this.signinForm.get('password')?.hasError('required')) {
      return 'You must enter a value';
    }

    return this.signinForm.get('email')?.hasError('email') ? 'Not a valid email' : '';
  }

  onSignin() {
    
  }
}
