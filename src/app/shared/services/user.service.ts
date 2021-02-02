import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Injectable()
export class UserService {

    constructor(
        public afAuth: AngularFireAuth
    ) {}

    getCurrentUser(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            const tmp = localStorage.getItem('user');

            if (tmp === null || tmp === 'null') {
                reject('No user logged in');
            }
            else {
                resolve(JSON.parse(tmp));
            }
        });
    }

    updateCurrentUser(value: { name: any; }): Promise<firebase.User> {
        return new Promise<firebase.User>((resolve, reject) => {
            const user = firebase.auth().currentUser;
            if (user !== null) {
                user.updateProfile({
                    displayName: value.name,
                    photoURL: user.photoURL
                }).then(() => {
                    resolve(user);
                }, err => reject(err));
            }
        });
    }
}
