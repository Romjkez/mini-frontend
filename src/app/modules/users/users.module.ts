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
import { UserRatingPipe } from './components/pipes/user-rating.pipe';
import { UserRolePipe } from './components/pipes/user-role.pipe';
import { ChipModule } from 'primeng/chip';
import { ProgressSpinnerModule } from 'primeng/progressspinner';


@NgModule({
  declarations: [
    UsersListComponent,
    CreateUserFormComponent,
    UserViewComponent,
    UserFormComponent,
    UserRatingPipe,
    UserRolePipe
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
  ],
  providers: [
    UsersService,
    {provide: CRUD_SERVICE, useExisting: UsersService}
  ],
})
export class UsersModule {
}
