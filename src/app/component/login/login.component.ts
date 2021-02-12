import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorMessage = '';
  isLoggedIn = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  tryLogin(value: { email: string; password: string; }): void {
    this.authService.doLogin(value)
      .then(
        res => {
          this.isLoggedIn = res,
            this.reloadPage();
        },
        err => this.errorMessage = err
      );
  }

  reloadPage(): void {
    window.location.reload();
  }
}
