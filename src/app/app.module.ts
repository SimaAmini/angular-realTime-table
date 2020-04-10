import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// modules
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgAlertModule } from '@theo4u/ng-alert';
// services
import { UserService } from 'src/services/user.service';
import { PusherService } from 'src/services/pusher.service';
// components
import { CreateUserComponent } from './create-user/create-user.component';
import { ListUserComponent } from './list-user/list-user.component';

@NgModule({
  declarations: [AppComponent, ListUserComponent, CreateUserComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgAlertModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [UserService, PusherService],
  bootstrap: [AppComponent]
})
export class AppModule {}
