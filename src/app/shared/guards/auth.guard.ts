import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UserService } from '../services/user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private userService: UserService,
        private router: Router
    ) {}

    canActivate(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.userService.getCurrentUser()
                .then(() => {
                    this.router.navigate(['/profile']);
                    return resolve(false);
                }, err => {
                    console.log(err);
                    return resolve(true);
                });
        });
    }
}
