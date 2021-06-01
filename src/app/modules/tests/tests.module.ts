import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestsRoutingModule } from './tests-routing.module';
import { TestsListComponent } from './components/tests-list/tests-list.component';
import { CreateTestComponent } from './components/create-test/create-test.component';
import { TestViewComponent } from './components/test-view/test-view.component';
import { CRUD_SERVICE } from '../shared/resolvers/by-id.resolver';
import { TestService } from './test.service';
import { TableModule } from 'primeng/table';
import { SharedModule } from '../shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ReactiveFormsModule } from '@angular/forms';
import { TestFormComponent } from './components/test-form/test-form.component';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { ChipsModule } from 'primeng/chips';
import { AccordionModule } from 'primeng/accordion';
import { ExactAnswerQuestionFormComponent } from './components/questions/exact-answer-question-form/exact-answer-question-form.component';
import { OneOfQuestionFormComponent } from './components/questions/one-of-question-form/one-of-question-form.component';
import { SplitButtonModule } from 'primeng/splitbutton';
import { QuestionTitlePipe } from './pipes/question-title.pipe';
import { ManyOfQuestionFormComponent } from './components/questions/many-of-question-form/many-of-question-form.component';
import { OrderQuestionFormComponent } from './components/questions/order-question-form/order-question-form.component';


@NgModule({
  declarations: [
    TestsListComponent,
    CreateTestComponent,
    TestViewComponent,
    TestFormComponent,
    ExactAnswerQuestionFormComponent,
    OneOfQuestionFormComponent,
    QuestionTitlePipe,
    ManyOfQuestionFormComponent,
    OrderQuestionFormComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    TestsRoutingModule,
    SharedModule,
    ButtonModule,
    CardModule,
    ReactiveFormsModule,
    InputTextModule,
    TooltipModule,
    ChipsModule,
    AccordionModule,
    SplitButtonModule,
  ],
  providers: [
    TestService,
    {provide: CRUD_SERVICE, useExisting: TestService},
  ]
})
export class TestsModule {
}
