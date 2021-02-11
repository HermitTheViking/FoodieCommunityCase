import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { Observable } from 'rxjs';

import { TokenStorageService } from './token-storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private afAuth: AngularFireAuth,
        private tokenStorage: TokenStorageService,
        private router: Router,
        public ngZone: NgZone
    ) { }

    doLogin(value: { email: string; password: string; }): Promise<any> {
        return firebase.auth().signInWithEmailAndPassword(value.email, value.password)
            .then(login => {
                login.user?.getIdTokenResult().then(token => {
                    this.tokenStorage.saveToken(token.token);
                });
                this.tokenStorage.saveUser(login);
                this.router.navigate(['/profile']);
                return true;
            },
                err => {
                    console.log('err ' + err);
                    return err.message;
                }
            );
    }

    get isLoggedIn(): boolean {
        if (!!this.tokenStorage.getToken()) {
            const user = this.tokenStorage.getUser();
            return (user !== null && user.emailVerified !== false) ? true : false;
        }
        else {
            return false;
        }
    }

    doRegister(value: { email: string; password: string; }): Promise<any> {
        return firebase.auth().createUserWithEmailAndPassword(value.email, value.password).then(res => {
            console.log(res);
            this.doSendVerificationMail(res);
            return 'Your account has been created';
        }, err => {
            console.log('err ' + err);
            return err.message;
        });
    }

    doSendVerificationMail(currentUser: firebase.auth.UserCredential): void {
        if (currentUser !== null && currentUser.user !== null) {
            currentUser.user.sendEmailVerification();
        }
    }

    doLogout(): Promise<any> {
        this.tokenStorage.signOut();
        return this.afAuth.signOut()
            .then(
                () => true,
                err => {
                    console.log('err ' + err);
                    return err.message;
                }
            );
    }
}
