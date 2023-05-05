import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css'],
})
export class ProfileEditComponent implements OnInit, OnDestroy {
  editForm!: FormGroup;
  user = new User();
  private sub!: Subscription;
  errorMessage: string = 'cannot update personal information';

  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      surname: ['', [Validators.required, Validators.minLength(2)]],
      email: [''],
      confirmEmail: ['',],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: [''],
    });

    const email: any = sessionStorage.getItem('email');
    this.sub = this.service.getUserByEmail(email).subscribe({
      next: (users: any) => {
        const user = users[0];
        console.log(user);
        this.editForm.patchValue({
          firstName: user.firstName,
          surname: user.surname,
          email: user.email,
          password: user.password,
        });
      },
      error: (err) => console.log(err),
    });
  }

  updateUser() {
    const email: any = sessionStorage.getItem('email');
    const updatedUser: User = { ...this.user, ...this.editForm.value };
    console.log(this.editForm.valid)
    if (this.editForm.valid) {
      if (this.editForm.dirty) {
        console.log(this.user.confirmPassword, this.editForm.value);
        this.service.updateUserByEmail(email, updatedUser).subscribe({
          next: () => {
            sessionStorage.setItem('password', updatedUser.password);
            this.onSaveComplete();
          },
          error: (error) => {
            this.errorMessage = error;
          }}
        );
      }
    } else {
      alert('Please correct the Validation errors') ;
    }
  }

  onSaveComplete() {
    this.editForm.reset();
    this.router.navigate(['/profile']);
  }

  ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }

  getNameErrorMessage() {
    if (this.editForm.get('firstName')?.hasError('required')) {
      return 'First name is required.';
    }
    return this.editForm.get('firstName')?.hasError('minlength')
      ? 'First name must be at least 2 characters long.'
      : '';
  }

  getSurnameErrorMessage() {
    if (this.editForm.get('surname')?.hasError('required')) {
      return 'Surname is required.';
    }
    return this.editForm.get('surname')?.hasError('minlength')
      ? 'Surname must be at least 2 characters long.'
      : '';
  }

  getEmailErrorMessage() {
    if (this.editForm.get('email')?.hasError('required')) {
      return 'You must enter a value';
    }

    return this.editForm.get('email')?.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  getPasswordErrorMessage() {
    if (this.editForm.get('password')?.hasError('required')) {
      return 'You must enter a value';
    }

    return this.editForm.get('password')?.hasError('minlength')
      ? 'Password must be at least 8 characters long.'
      : '';
  }
}
