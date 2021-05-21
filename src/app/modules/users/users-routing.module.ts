import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './components/users-list/users-list.component';
import { CreateUserFormComponent } from './components/create-user-form/create-user-form.component';
import { UserViewComponent } from './components/user-view/user-view.component';
import { ByIdResolver } from '../shared/resolvers/by-id.resolver';

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
  },
  {
    path: ':id',
    pathMatch: 'full',
    component: UserViewComponent,
    resolve: {
      user: ByIdResolver,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
