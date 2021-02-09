import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm!: FormGroup;
  errorMessage = '';
  successMessage = '';

  constructor(
    public authService: AuthService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm(): void {
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  tryRegister(value: { email: string; password: string; }): void {
    this.authService.doRegister(value)
      .then(res => {
        console.log(res);
        this.errorMessage = '';
        this.successMessage = 'Your account has been created';
        this.authService.doSendVerificationMail(res);
      }, err => {
        console.log('err ' + err);
        this.errorMessage = err.message;
        this.successMessage = '';
      });
  }
}
