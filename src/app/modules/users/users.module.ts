import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersService } from './users.service';
import { UsersListComponent } from './components/users-list/users-list.component';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CreateUserFormComponent } from './components/create-user-form/create-user-form.component';
import { InputTextModule } from 'primeng/inputtext';
import { UserViewComponent } from './components/user-view/user-view.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { SharedModule } from '../shared/shared.module';
import { CRUD_SERVICE } from '../shared/resolvers/by-id.resolver';
import { BadgeModule } from 'primeng/badge';
import { TooltipModule } from 'primeng/tooltip';
import { ChipModule } from 'primeng/chip';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { UserRolePipe } from './pipes/user-role.pipe';
import { UserRatingPipe } from './pipes/user-rating.pipe';
import { ChangePasswordModalComponent } from './components/change-password-modal/change-password-modal.component';
import { MenuModule } from 'primeng/menu';
import { DialogModule } from 'primeng/dialog';
import { PasswordModule } from 'primeng/password';


@NgModule({
  declarations: [
    UsersListComponent,
    CreateUserFormComponent,
    UserViewComponent,
    UserFormComponent,
    UserRatingPipe,
    UserRolePipe,
    ChangePasswordModalComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    TableModule,
    CardModule,
    MultiSelectModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    SharedModule,
    BadgeModule,
    TooltipModule,
    ChipModule,
    ProgressSpinnerModule,
    MenuModule,
    DialogModule,
    PasswordModule,
  ],
  providers: [
    UsersService,
    {provide: CRUD_SERVICE, useExisting: UsersService}
  ],
})
export class UsersModule {
}
