import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../../shared/services/user.service';
import { AuthService } from '../../shared/security/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseUserModel } from '../../shared/models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user: FirebaseUserModel = new FirebaseUserModel();
  profileForm!: FormGroup;

  openTab = 1;
  Profile = true;
  Menu = true;

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(routeData => {
      const data = routeData.data;
      if (data) {
        this.user = data;
        this.createForm(this.user.name);
      }
    });
  }

  createForm(name: string): void {
    this.profileForm = this.fb.group({
      name: [name, Validators.required]
    });
  }

  save(value: { name: any; }): void {
    this.userService.updateCurrentUser(value).then(
      res => localStorage.setItem('user', JSON.stringify(res)),
      err => console.log('err ' + err));
  }

  logout(): void {
    this.authService.doLogout().then(() => this.router.navigate(['/login']), (error) => console.log('Logout error', error));
  }

  toggleProfile(): void {
    this.Profile = !this.Profile;
  }

  toggleMenu(): void {
    this.Menu = !this.Menu;
  }

  toggleTab(tab: number): void {
    this.openTab = tab;
    this.Profile = true;
    this.Menu = true;
  }
}
