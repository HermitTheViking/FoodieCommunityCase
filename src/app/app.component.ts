import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  OpenTab = 2;
  Menu = true;
  Profile = true;
  isLoggedIn = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn;
  }

  doLogout(): void {
    this.Profile = true;
    this.authService.doLogout()
      .then(
        () => { this.router.navigate(['/login']), window.location.reload(); },
        err => this.errorMessage = err
      );
  }

  doToggleMenu(): void {
    this.Menu = !this.Menu;
  }

  doToggleProfile(): void {
    this.Profile = !this.Profile;
  }

  doGoToDashboard(): void {
    this.router.navigate(['/home']);
    this.OpenTab = 1;
    this.Profile = true;
    this.Menu = true;
  }

  doGoToProfile(): void {
    this.router.navigate(['/profile']);
    this.OpenTab = 2;
    this.Profile = true;
    this.Menu = true;
  }
}
