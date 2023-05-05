import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  navbarItems = [
    { label: 'Home', link: '/home', ariaLabel: 'Go to Home page' },
    { label: 'Your movies', link: '/your-movies', ariaLabel: 'Go to Your Movies page' },
    { label: 'Profile', link: '/profile', ariaLabel: 'Go to Profile page' },
    // { label: 'Log Out', link: '/welcome', ariaLabel: 'Go to Login page', clickHandler: 'logout' },
    
    ];

  logout() : void {
    console.log("logout")
    sessionStorage.clear()
  }
}
