import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ByIdResolver } from './resolvers/by-id.resolver';
import { DefaultValuePipe } from './pipes/default-value.pipe';
import { BooleanPipe } from './pipes/is-private.pipe';
import { CreatedUpdatedDatePipe } from './pipes/created-updated-date.pipe';
import { TagsPipe } from './pipes/tags.pipe';
import { PeriodPipe } from './pipes/period.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BooleanPipe,
    DefaultValuePipe, // TODO: move to separate module when needed
    CreatedUpdatedDatePipe, TagsPipe, PeriodPipe,
  ],
  providers: [
    ByIdResolver,
  ],
  exports: [
    BooleanPipe,
    DefaultValuePipe,
    CreatedUpdatedDatePipe,
    TagsPipe,
    PeriodPipe,
  ]
})
export class SharedModule {
}
