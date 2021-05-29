import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ByIdResolver } from '../shared/resolvers/by-id.resolver';
import { TestsListComponent } from './components/tests-list/tests-list.component';
import { CreateTestComponent } from './components/create-test/create-test.component';
import { TestViewComponent } from './components/test-view/test-view.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TestsListComponent,
  },
  {
    path: 'create',
    pathMatch: 'full',
    component: CreateTestComponent,
  },
  {
    path: ':id',
    pathMatch: 'full',
    component: TestViewComponent,
    resolve: {
      user: ByIdResolver,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestsRoutingModule {
}
