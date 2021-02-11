import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { TokenStorageService } from './token-storage.service';

@Injectable()
export class UserService {
    constructor(
        private tokenStorage: TokenStorageService
    ) { }

    getCurrentUser(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            const tmp = this.tokenStorage.getUser();

            if (tmp === null) {
                reject('No user logged in');
            }
            else {
                resolve(tmp);
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
