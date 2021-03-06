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
import { ReactiveFormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { ChipsModule } from 'primeng/chips';
import { EditorModule } from 'primeng/editor';
import { ParseHtmlTextPipe } from './pipes/parse-html-text.pipe';
import { TabViewModule } from 'primeng/tabview';
import { ArticleFormComponent } from './components/article-form/article-form.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MenuModule } from 'primeng/menu';


@NgModule({
  declarations: [
    ArticlesListComponent,
    CreateArticleComponent,
    ArticleViewComponent,
    ParseHtmlTextPipe,
    ArticleFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ArticlesRoutingModule,
    CardModule,
    ButtonModule,
    PaginatorModule,
    TooltipModule,
    ChipModule,
    ReactiveFormsModule,
    InputSwitchModule,
    InputTextModule,
    ChipsModule,
    EditorModule,
    TabViewModule,
    ProgressSpinnerModule,
    MenuModule
  ],
  providers: [
    ArticleService,
    {provide: CRUD_SERVICE, useExisting: ArticleService}
  ],
})
export class ArticlesModule {
}
