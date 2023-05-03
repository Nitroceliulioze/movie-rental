import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/user';


@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css'],
})
export class ProfileEditComponent implements OnInit {
  editForm!: FormGroup;
  user = new User();

  constructor(private fb: FormBuilder, private service: UserService, private router: Router) {}

  ngOnInit(): void {
    this.editForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      surname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    }, );

    const email: any = sessionStorage.getItem('email');
    this.service.getUserByEmail(email).subscribe({
      next: (users: any) => {
        const user = users[0];
       this.editForm.patchValue({
        firstName: user.firstName,
        surname: user.surname,
        email: user.email,
        password: user.password,
       })
      },
      error: (err) => console.log(err),
    });
  }


  updateUser() {
    console.log('save')
    this.router.navigate(['/profile'])
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
    if (
      this.editForm.get('email')?.hasError('required')
    ) {
      return 'You must enter a value';
    }

    return this.editForm.get('email')?.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  getPasswordErrorMessage() {
    if (
      this.editForm
        .get('password')
        ?.hasError('required')
    ) {
      return 'You must enter a value';
    }

    return this.editForm
      .get('password')
      ?.hasError('minlength')
      ? 'Password must be at least 8 characters long.'
      : '';
  }


  
}
