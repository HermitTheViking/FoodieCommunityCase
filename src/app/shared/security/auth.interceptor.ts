import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.getToken();
        if (token) {
            const header = 'Bearer ' + token;
            const reqWithAuth = req.clone({ headers: req.headers.set('Authorization', header) });
            return next.handle(reqWithAuth);
        }

        return next.handle(req);
    }
}
