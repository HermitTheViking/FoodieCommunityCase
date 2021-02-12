import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  OpenTab = 2;
  Menu = true;
  Profile = true;
  isLoggedIn = false;
  errorMessage = '';
  event$: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private location: Location
  ) {
    this.event$ = this.location.onUrlChange((val) => {
      if (val === '/login') {
        this.OpenTab = 3;
      }
      else if (val === '/register') {
        this.OpenTab = 4;
      }
      else if (val === '/home' || val === '/edit' || val === '/add') {
        this.OpenTab = 1;
      }
      else if (val === '/profile') {
        this.OpenTab = 2;
      }
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn;
  }

  ngOnDestroy(): void {
    this.event$.unsubscribe();
  }

  doLogout(): void {
    this.Profile = true;
    this.authService.doLogout()
      .then(
        () => { this.router.navigate(['/login']), window.location.reload(); },
        err => this.errorMessage = err
      );
  }
}
