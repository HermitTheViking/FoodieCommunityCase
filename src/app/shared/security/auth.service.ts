import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        public afAuth: AngularFireAuth,
        public ngZone: NgZone
    ) {}

    doLogin(value: { email: string; password: string; }): Promise<firebase.auth.UserCredential> {
        return firebase.auth().signInWithEmailAndPassword(value.email, value.password);
    }

    get isLoggedIn(): boolean {
        const tmp = localStorage.getItem('user');
        if (tmp === null) {
            return false;
        }
        const user = JSON.parse(tmp);
        return (user !== null && user.emailVerified !== false) ? true : false;
    }

    doRegister(value: { email: string; password: string; }): Promise<firebase.auth.UserCredential> {
        return firebase.auth().createUserWithEmailAndPassword(value.email, value.password);
    }

    doSendVerificationMail(currentUser: firebase.auth.UserCredential): void {
        if (currentUser !== null && currentUser.user !== null) {
            currentUser.user.sendEmailVerification();
        }
    }

    doLogout(): Promise<void> {
        localStorage.removeItem('user');
        return this.afAuth.signOut();
    }

    getToken(): string {
        const tmp = localStorage.getItem('user');
        if (tmp === null) {
            return '';
        }
        return JSON.parse(tmp).stsTokenManager.accessToken;
    }
}
