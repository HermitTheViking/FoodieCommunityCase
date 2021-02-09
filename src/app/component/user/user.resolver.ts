import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';

import { UserService } from '../../shared/services/user.service';
import { FirebaseUserModel } from '../../shared/models/user.model';

@Injectable()
export class UserResolver implements Resolve<FirebaseUserModel> {

    constructor(
        public userService: UserService,
        private router: Router
    ) { }

    resolve(route: ActivatedRouteSnapshot): Promise<FirebaseUserModel> {
        const user = new FirebaseUserModel();

        return new Promise((resolve, reject) => {
            this.userService.getCurrentUser()
                .then(res => {
                    if (res !== null) {
                        if (res.providerData[0].providerId === 'password') {
                            user.image = 'assets/svg/person-circle.svg';
                            user.name = res.displayName;
                            user.provider = res.providerData[0].providerId;
                            user.email = res.email;
                            user.token = res.stsTokenManager.accessToken;
                        }
                        else {
                            user.image = res.photoURL;
                            user.name = res.displayName;
                            user.provider = res.providerData[0].providerId;
                            user.email = res.email;
                        }
                    }
                    return resolve(user);
                }, err => {
                    console.log('err ' + err);
                    this.router.navigate(['/login']);
                    return reject(err);
                });
        });
    }
}
