import { Routes } from '@angular/router';

import { LoginComponent } from './component/login/login.component';
import { UserComponent } from './component/user/user.component';
import { RegisterComponent } from './component/register/register.component';
import { UserResolver } from './component/user/user.resolver';
import { AuthGuard } from './shared/security/auth.guard';

export const rootRouterConfig: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
    { path: 'user', component: UserComponent, resolve: { data: UserResolver } }
];
