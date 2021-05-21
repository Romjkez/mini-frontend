import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExercisesRoutingModule } from './exercises-routing.module';
import { ExercisesListComponent } from './components/exercises-list/exercises-list.component';


@NgModule({
  declarations: [
    ExercisesListComponent
  ],
  imports: [
    CommonModule,
    ExercisesRoutingModule
  ]
})
export class ExercisesModule {
}
