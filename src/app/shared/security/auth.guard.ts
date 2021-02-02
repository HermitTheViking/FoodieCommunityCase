import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        public afAuth: AngularFireAuth,
        public userService: UserService,
        private router: Router
    ) {}

    canActivate(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.userService.getCurrentUser()
                .then(() => {
                    this.router.navigate(['/user']);
                    return resolve(false);
                }, err => {
                    console.log('err ' + err);
                    return resolve(true);
                });
        });
    }
}
