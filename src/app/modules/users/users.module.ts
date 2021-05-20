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


@NgModule({
  declarations: [
    UsersListComponent,
    CreateUserFormComponent
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
    InputTextModule
  ],
  providers: [UsersService],
})
export class UsersModule {
}
