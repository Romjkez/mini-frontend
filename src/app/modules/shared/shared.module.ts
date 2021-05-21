import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ByIdResolver } from './resolvers/by-id.resolver';
import { DefaultValuePipe } from './pipes/default-value.pipe';
import { BooleanPipe } from './pipes/is-private.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BooleanPipe,
    DefaultValuePipe // TODO: move to separate module when needed
  ],
  providers: [
    ByIdResolver,
  ],
  exports: [
    BooleanPipe,
    DefaultValuePipe
  ]
})
export class SharedModule {
}
