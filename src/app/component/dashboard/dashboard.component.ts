import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

import { RestService } from 'src/app/shared/services/rest.service';
import { UserService } from 'src/app/shared/services/user.service';
import { RecipModel } from 'src/app/shared/models/recip.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  recips: any = [];
  showRecip = false;
  showNutrientInfo = false;

  constructor(
    private userService: UserService,
    private restService: RestService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.getCurrentUser()
      .then(() => { },
        err => {
          this.router.navigate(['/login']);
        });

    this.restService.doGetAllRecips().subscribe((res: {}) => {
      this.recips = res;
    });
  }

  gotoEdit(recip: RecipModel): void {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        data: JSON.stringify(recip)
      }
    };
    this.router.navigate([`/edit/${recip.dbId}`], navigationExtras);
  }

  doAddNew(): void {
    this.router.navigate(['/add']);
  }

  doDelete(id: number): void {
    this.removeItem(this.recips.indexOf(id));
    this.restService.doDeleteRecipById(id);
  }

  removeItem(index: number): void {
    this.recips.splice(index, 1);
  }
}
