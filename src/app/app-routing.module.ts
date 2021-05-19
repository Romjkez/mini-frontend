import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './modules/main-page/components/main-page/main-page.component';
import { NotFoundPageComponent } from './common/components/not-found-page/not-found-page.component';
import { AuthGuard } from './common/guards/auth.guard';
import { NotAuthorizedGuard } from './common/guards/not-authorized.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MainPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule),
  },
  {
    path: 'auth',
    canActivate: [NotAuthorizedGuard],
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'articles',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/articles/articles.module').then(m => m.ArticlesModule),
  },
  {
    path: 'tests',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/tests/tests.module').then(m => m.TestsModule),
  },
  {
    path: 'exercises',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/exercises/exercises.module').then(m => m.ExercisesModule),
  },
  {
    path: 'news',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/news/news.module').then(m => m.NewsModule),
  },
  {
    path: '404',
    canActivate: [AuthGuard],
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
