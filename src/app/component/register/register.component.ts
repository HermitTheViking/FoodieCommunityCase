import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

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
    private authService: AuthService,
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
    .then(
      res => { this.successMessage = res, this.errorMessage = ''; },
      err => { this.successMessage = '', this.errorMessage = err; }
    );
  }
}
