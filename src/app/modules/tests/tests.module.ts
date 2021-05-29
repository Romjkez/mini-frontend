import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestsRoutingModule } from './tests-routing.module';
import { TestsListComponent } from './components/tests-list/tests-list.component';
import { CreateTestComponent } from './components/create-test/create-test.component';
import { TestViewComponent } from './components/test-view/test-view.component';
import { CRUD_SERVICE } from '../shared/resolvers/by-id.resolver';
import { TestService } from './test.service';


@NgModule({
  declarations: [
    TestsListComponent,
    CreateTestComponent,
    TestViewComponent
  ],
  imports: [
    CommonModule,
    TestsRoutingModule
  ],
  providers: [
    TestService,
    {provide: CRUD_SERVICE, useExisting: TestService},
  ]
})
export class TestsModule {
}
