import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesListComponent } from './components/articles-list/articles-list.component';
import { CreateArticleComponent } from './components/create-article/create-article.component';
import { ArticleViewComponent } from './components/article-view/article-view.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ArticlesListComponent,
  },
  {
    path: '/create',
    pathMatch: 'full',
    component: CreateArticleComponent,
  },
  {
    path: ':id',
    component: ArticleViewComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule {
}
