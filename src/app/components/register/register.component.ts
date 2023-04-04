import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn,
  FormArray
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm!: FormGroup;
  signinForm!: FormGroup;

  firstName = new FormControl('', Validators.required,);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', Validators.required,);
 ngOnInit(): void {
   this.signinForm = new FormGroup({})
   this.registerForm = new FormGroup({
    
   })
 }
  getErrorMessage() {
    if (this.email.hasError('required') || this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}
