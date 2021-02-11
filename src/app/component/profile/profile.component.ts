import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { RestService } from 'src/app/shared/services/rest.service';
import { UserService } from 'src/app/shared/services/user.service';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';

import { UpdateCacheModel } from 'src/app/shared/models/updateCache.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  user: any;

  constructor(
    private userService: UserService,
    private restService: RestService,
    private tokenStorage: TokenStorageService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.getCurrentUser()
      .then(() => {},
      err => {
        this.router.navigate(['/login']);
      });

    this.user = this.tokenStorage.getUser();
    this.createForm(this.user.name);
  }

  createForm(name: string): void {
    this.profileForm = this.fb.group({
      name: [name, Validators.required]
    });
  }

  doSave(value: { name: string; }): void {
    this.userService.updateCurrentUser(value).then(
      res => this.tokenStorage.saveUser(res),
      err => console.log('err ' + err));
  }

  doUpdateCache(): void {
    const tmp = new UpdateCacheModel();
    tmp.PageNumer = 1;
    tmp.PageSize = 2;
    this.restService.doUpdateCache(tmp);
  }
}
