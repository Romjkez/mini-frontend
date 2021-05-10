import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './modules/main-page/components/main-page/main-page.component';
import { NotFoundPageComponent } from './common/components/not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MainPageComponent,
  },
  {
    path: '404',
    pathMatch: 'full',
    component: NotFoundPageComponent,
  },
  {
    path: '**',
    redirectTo: '404'
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
