import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipModel } from 'src/app/shared/models/recip.model';

import { RestService } from 'src/app/shared/services/rest.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  recips: any = [];

  constructor(
    private userService: UserService,
    private restService: RestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getCurrentUser()
      .then(() => {},
      err => {
        this.router.navigate(['/login']);
      });

    this.restService.doGetAllRecips().subscribe((res: {}) => {
      this.recips = res;
    });
  }

  doEditOfRecip(recip: RecipModel): void {
    this.router.navigate(['/edit', { recip }]);
  }
}
