import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/user';

function emailMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const emailControl = c.get('email');
  const confirmControl = c.get('confirmEmail');

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
  const passwordControl = c.get('password');
  const confirmPassControl = c.get('confirmPassword');

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
  user = new User();

  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      surname: ['', [Validators.required, Validators.minLength(2)]],
      registerEmailGroup: this.fb.group(
        {
          email: ['', [Validators.required, Validators.email]],
          confirmEmail: ['', [Validators.required]],
        },
        { validators: emailMatcher }
      ),
      registerPasswordGroup: this.fb.group(
        {
          password: ['', [Validators.required, Validators.minLength(8)]],
          confirmPassword: ['', Validators.required],
        },
        { validators: passwordMatcher }
      ),
    });
  }

  save() {
    if (this.registerForm.valid) {
      const newUser = {
        id: Number(''),
        firstName: this.registerForm.value.firstName,
        surname: this.registerForm.value.surname,
        email: this.registerForm.value.registerEmailGroup.email,
        confirmEmail: this.registerForm.value.registerEmailGroup.confirmEmail,
        password: this.registerForm.value.registerPasswordGroup.password,
        confirmPassword: this.registerForm.value.registerPasswordGroup.confirmPassword,
      };

      console.log(newUser)

     this.service.saveUser(newUser).subscribe(() => {
        alert(`${newUser.firstName} has been registered`);
        this.router.navigate(['/welcome'])
      });
    }
  }

  getErrorMessage(): string[] {
    const messages: string[] = [];

    const firstNameControl = this.registerForm.get('firstName');
    if (firstNameControl?.hasError('required')) {
      messages.push('First name is required.');
    }
    if (firstNameControl?.hasError('minlength')) {
      messages.push('First name must be at least 2 characters long.');
    }

    const surnameControl = this.registerForm.get('surname');
    if (surnameControl?.hasError('required')) {
      messages.push('Surname is required.');
    }
    if (surnameControl?.hasError('minlength')) {
      messages.push('Surname must be at least 2 characters long.');
    }

    const email1Control = this.registerForm.get('registerEmailGroup.email');
    if (email1Control?.hasError('required')) {
      messages.push('Email is required.');
    }
    if (email1Control?.hasError('email')) {
      messages.push('Email is not valid.');
    }

    const email2Control = this.registerForm.get(
      'registerEmailGroup.confirmEmail'
    );
    if (email2Control?.hasError('required')) {
      messages.push('Confirm email is required.');
    }

    const passwordControl = this.registerForm.get(
      'registerPasswordGroup.password'
    );
    if (passwordControl?.hasError('required')) {
      messages.push('Password is required.');
    }
    if (passwordControl?.hasError('minlength')) {
      messages.push('Password must be at least 8 characters long.');
    }

    const password2Control = this.registerForm.get(
      'registerPasswordGroup.confirmPassword'
    );
    if (password2Control?.hasError('required')) {
      messages.push('Confirm password is required.');
    }

    const emailGroupControl = this.registerForm.get('registerEmailGroup');
    if (emailGroupControl?.errors?.['emailMatcher']) {
      messages.push('Emails do not match.');
    }

    const passwordGroupControl = this.registerForm.get('registerPasswordGroup');
    if (passwordGroupControl?.errors?.['passwordMatcher']) {
      messages.push('Passwords do not match.');
    }

    return messages;
  }
}
