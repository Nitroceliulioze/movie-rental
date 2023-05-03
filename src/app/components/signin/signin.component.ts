import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  signinForm!: FormGroup;
  user: User = new User();

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

  onSignin() {
    console.log(this.signinForm.value);
    const email = this.signinForm.value.email;
    console.log(email);
    this.service.getUserByEmail(email).subscribe({
      next: (users: any) => {
        const user = users[0];
        console.log(user);
        console.log(user.password, this.signinForm.value.password)
        if (user.password === this.signinForm.value.password) {
          sessionStorage.setItem('email', user.email);
          sessionStorage.setItem('password', user.password);
          console.log('Setting session storage items...');
          this.router.navigate(['/home']);
        }
      },
      error: err => console.log(err)
    });
    
    
  }
  
}
