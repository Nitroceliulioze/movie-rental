import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit, OnDestroy {
  signinForm!: FormGroup;
  user: User = new User();
  private sub!: Subscription;

  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  getEmailErrorMessage() {
    if (this.signinForm.get('email')?.hasError('required')) {
      return 'You must enter a value';
    }

    return this.signinForm.get('email')?.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  getPasswordErrorMessage() {
    if (this.signinForm.get('password')?.hasError('required')) {
      return 'You must enter a value';
    }

    return this.signinForm.get('password')?.hasError('minlength')
      ? 'Password must be at least 8 characters long.'
      : '';
  }

  onSignin() {
    console.log(this.signinForm.value);
    const email = this.signinForm.value.email;
    console.log(email);
    this.sub = this.service.getUserByEmail(email).subscribe({
      next: (users: any) => {
        const user = users[0];
        console.log(user);
        console.log(user.password, this.signinForm.value.password);
        if (user.password === this.signinForm.value.password) {
          sessionStorage.setItem('email', user.email);
          sessionStorage.setItem('password', user.password);
          console.log('Setting session storage items...');
          this.router.navigate(['/home']);
        } else {
          alert('Email or password is not correct') //only password is incorrect, how to make error message for email?
        }
      },
      error: (err) => console.log(err),
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
