import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule  } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { environment } from '../environments/environment';

import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { ProfileComponent } from './component/profile/profile.component';
import { EditComponent } from './component/edit/edit.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';

import { AuthService } from './shared/services/auth.service';
import { UserService } from './shared/services/user.service';
import { RestService } from './shared/services/rest.service';

import { authInterceptorProviders } from './shared/interceptors/auth.interceptor';

import { AuthGuard } from './shared/guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    EditComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule
  ],
  providers: [
    AuthService,
    UserService,
    AuthGuard,
    authInterceptorProviders,
    RestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
