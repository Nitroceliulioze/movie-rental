import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  name!: string;
  surname!: string;
  email!:string;

  constructor(private service: UserService) {}

  ngOnInit(): void {
    const email: any = sessionStorage.getItem('email');
    console.log(email);
    this.service.getUserByEmail(email).subscribe({
      next: (users: any) => {
        const user = users[0];
        console.log(user);
        this.name = user.firstName;
        this.surname = user.surname;
        this.email = user.email;
      },
      error: (err) => console.log(err),
    });
  }
}
