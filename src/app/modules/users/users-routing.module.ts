import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './components/users-list/users-list.component';
import { CreateUserFormComponent } from './components/create-user-form/create-user-form.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: UsersListComponent,
  },
  {
    path: 'create',
    pathMatch: 'full',
    component: CreateUserFormComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
