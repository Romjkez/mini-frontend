import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenubarModule } from 'primeng/menubar';
import { MessageService, SharedModule } from 'primeng/api';
import { AvatarMenuComponent } from './common/components/avatar-menu/avatar-menu.component';
import { AvatarModule } from 'primeng/avatar';
import { SlideMenuModule } from 'primeng/slidemenu';
import { ButtonModule } from 'primeng/button';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NotFoundPageComponent } from './common/components/not-found-page/not-found-page.component';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { AuthInterceptor } from './modules/auth/interceptors/auth.interceptor';
import { RippleModule } from 'primeng/ripple';
import { MainPageModule } from './modules/main-page/main-page.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AvatarMenuComponent,
    NotFoundPageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MenubarModule,
    SharedModule,
    AvatarModule,
    SlideMenuModule,
    ButtonModule,
    CardModule,
    ToastModule,
    RippleModule,
    MainPageModule,
  ],
  providers: [
    MessageService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
