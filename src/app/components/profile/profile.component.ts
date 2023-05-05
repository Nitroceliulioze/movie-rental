import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  name!: string;
  surname!: string;
  email!: string;
  private sub!: Subscription;

  constructor(private service: UserService) {}

  ngOnInit(): void {
    const email: any = sessionStorage.getItem('email');
    console.log(email);
    if (email) {
      this.sub = this.service.getUserByEmail(email).subscribe({
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

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
