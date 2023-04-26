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
    let userId: number = Number(this.route.snapshot.paramMap.get('id'))
    console.log(userId) //0 anytime
    this.service.getUser(userId).subscribe({
      next: user => this.user = user,
      error: err => console.log(err),      
      })
      if (this.user.password === this.signinForm.value.password) {
        sessionStorage.setItem('email', this.user.email);
        sessionStorage.setItem('password', this.user.password);
        this.router.navigate(['home']);
      }
    };
  
}
