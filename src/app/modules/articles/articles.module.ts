import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesListComponent } from './components/articles-list/articles-list.component';
import { ArticleService } from './article.service';
import { SharedModule } from '../shared/shared.module';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { CreateArticleComponent } from './components/create-article/create-article.component';
import { ArticleViewComponent } from './components/article-view/article-view.component';
import { TooltipModule } from 'primeng/tooltip';
import { ChipModule } from 'primeng/chip';
import { CRUD_SERVICE } from '../shared/resolvers/by-id.resolver';


@NgModule({
  declarations: [
    ArticlesListComponent,
    CreateArticleComponent,
    ArticleViewComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ArticlesRoutingModule,
    CardModule,
    ButtonModule,
    PaginatorModule,
    TooltipModule,
    ChipModule
  ],
  providers: [
    ArticleService,
    {provide: CRUD_SERVICE, useExisting: ArticleService}
  ],
})
export class ArticlesModule {
}
