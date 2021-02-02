import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../shared/security/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm!: FormGroup;
  errorMessage = '';

  constructor(
    public authService: AuthService,
    private router: Router,
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
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.user));
        this.router.navigate(['/user']);
      },
      (err) => {
        console.log('err ' + err);
        this.errorMessage = err.message;
      });
  }
}
