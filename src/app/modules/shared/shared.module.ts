import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ByIdResolver } from './resolvers/by-id.resolver';
import { DefaultValuePipe } from './pipes/default-value.pipe';
import { BooleanPipe } from './pipes/is-private.pipe';
import { CreatedUpdatedDatePipe } from './pipes/created-updated-date.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BooleanPipe,
    DefaultValuePipe, // TODO: move to separate module when needed
    CreatedUpdatedDatePipe,
  ],
  providers: [
    ByIdResolver,
  ],
  exports: [
    BooleanPipe,
    DefaultValuePipe,
    CreatedUpdatedDatePipe,
  ]
})
export class SharedModule {
}
